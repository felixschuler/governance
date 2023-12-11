import os
import re
import time
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


def download_pdf(pdf_url, file_path):
    response = requests.get(pdf_url)
    with open(file_path, 'wb') as file:
        file.write(response.content)

def get_pdf_link(report_page_url):
    response = requests.get(report_page_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    pdf_link = None
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.endswith('.pdf'):
            pdf_link = href
            break

    return pdf_link

base_url = 'https://chainsecurity.com/smart-contract-audit-reports/'
response = requests.get(base_url)
soup = BeautifulSoup(response.text, 'html.parser')

base_dir = '../public/reports/ChainSecurity'
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

for link in soup.find_all("a", class_="article__inner"):
    time.sleep(1)
    report_link = link.get('href')
    name = link.find('h3').text.strip()
    date = re.search(r'\d{4}-\d{2}-\d{2}', link.text).group()
    print(f"Checking {name}")
    
    pdf_url = get_pdf_link(report_link)
    auditee_dir = os.path.join(base_dir, name, date)
    if not os.path.exists(auditee_dir):
        os.makedirs(auditee_dir)
    
    if pdf_url:
        pdf_filename = os.path.basename(pdf_url)
        download_pdf(pdf_url, os.path.join(auditee_dir, pdf_filename))

print("All available pdf reports have been downloaded.")