import calendar
import os
import re
import time

import requests
from bs4 import BeautifulSoup


def month_to_number(month_name):
    month_number = list(calendar.month_name).index(month_name)
    return str(month_number).zfill(2)

def download_pdf(pdf_url, auditee, date, save_dir):
    pdf_filename = pdf_url.split('/')[-1]
    auditee_dir = os.path.join(save_dir, auditee, date)
    os.makedirs(auditee_dir, exist_ok=True)
    with open(os.path.join(auditee_dir, pdf_filename), 'wb') as file:
        file.write(requests.get(pdf_url).content)
    print(f"Downloaded {pdf_filename} to {auditee_dir}")
    print()

def scrape_audit_reports(main_url, save_dir):
    response = requests.get(main_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    for tr in soup.find_all('tr'):
        time.sleep(1)  # Respectful delay
        if 'stripe-dark' not in tr.get('class', []):
            date_text = re.search(r'\b[A-Z][a-z]+ \d{4}\b', tr.text)
            if date_text:
                date = date_text.group()
                month, year = date.split()
                formatted_date = f"{year}-{month_to_number(month)}"
                print("Date", formatted_date)

                report_link = tr.find('a', href=True)
                if report_link:
                    auditee = report_link.text.strip()
                    print("Checking", auditee)
                    report_page_url = 'https://consensys.io' + report_link['href']
                    report_page_response = requests.get(report_page_url)
                    report_page_soup = BeautifulSoup(report_page_response.text, 'html.parser')
                    pdf_link = report_page_soup.find('a', href=lambda href: href and href.startswith("/diligence/") and href.endswith('.pdf'))

                    if pdf_link:
                        pdf_url = 'https://consensys.io' + pdf_link['href']
                        print("Found PDF:", pdf_url)
                        download_pdf(pdf_url, auditee, formatted_date, save_dir)

script_dir = os.path.dirname(__file__)
main_url = 'https://consensys.io/diligence/audits/'
save_dir = os.path.join(script_dir, '../public/reports/Consensys Diligence')

scrape_audit_reports(main_url, save_dir)
