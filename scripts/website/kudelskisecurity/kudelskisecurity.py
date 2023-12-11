import os
import time

import requests
from bs4 import BeautifulSoup


def get_pdf_links(audit_page_url):
    time.sleep(1)
    response = requests.get(audit_page_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    pdf_links = []
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.endswith('.pdf'):
            print(href)
            pdf_links.append(href)
    return pdf_links

base_url = 'https://kudelskisecurity.com/audits/'
save_dir = '../public/reports/Kudelski Security'
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# Loop through each page of audit reports
for page in range(1, 4):  # Assuming 3 pages
    page_url = f"{base_url}?sf_paged={page}"
    time.sleep(1)
    response = requests.get(page_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    pdf_links = get_pdf_links(page_url)
    for pdf_link in pdf_links:
        time.sleep(1)
        pdf_filename = pdf_link.split('/')[-1]
        pdf_response = requests.get(pdf_link)
        with open(os.path.join(save_dir, pdf_filename), 'wb') as file:
            file.write(pdf_response.content)
        print(f"Downloaded {pdf_filename}")

print("All available reports have been downloaded.")
