import os
import re
import time

import requests
from bs4 import BeautifulSoup


def format_date_from_href(href):
    # Extract date in the format "YYYY/MM"
    date_match = re.search(r'(\d{4}/\d{2})', href)
    if date_match:
        return date_match.group().replace('/', '-')
    return None

def get_pdf_links(audit_page_url, processed_pdf_links):
    response = requests.get(audit_page_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    pdf_links = []
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.endswith('.pdf') and href not in processed_pdf_links:
            if href.startswith('/'):
                href = main_url + href.lstrip('/')
            pdf_links.append(href)
            processed_pdf_links.add(href)
    return pdf_links

main_url = 'https://hacken.io/'
processed_urls = set()
processed_pdf_links = set()

base_dir = 'Hacken'
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

# Loop through each page of audit reports
for page in range(1, 60):  # Assuming 59 pages
    page_url = f"{main_url}audits/?page={page}"
    response = requests.get(page_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.startswith('/audits/') and href != '/audits/' and href not in processed_urls:
            processed_urls.add(href)
            auditee_name = href.split('/')[2]  # Extract the auditee name from the href
            auditee_dir = os.path.join(base_dir, auditee_name)
            if not os.path.exists(auditee_dir):
                os.makedirs(auditee_dir)

            full_url = main_url + href.lstrip('/')
            print(f"Checking {full_url}")
            pdf_links = get_pdf_links(full_url, processed_pdf_links)
            for pdf_link in pdf_links:
                if not pdf_link.startswith('http://wp.hacken.io'):
                    print(f"Skipping {pdf_link}")
                    continue
                date = format_date_from_href(pdf_link)
                print(f"Found PDF: {pdf_link} ({date})")
                pdf_filename = pdf_link.split('/')[-1]
                pdf_response = requests.get(pdf_link)
                if not os.path.exists(os.path.join(auditee_dir, date)):
                    os.makedirs(os.path.join(auditee_dir, date))
                with open(os.path.join(auditee_dir, date, pdf_filename), 'wb') as file:
                    file.write(pdf_response.content)
                print(f"Downloaded {pdf_filename} to {auditee_dir}")

print("All available reports have been downloaded.")
