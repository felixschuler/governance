# import json
# import os
# import re
# import time

# import requests
# from bs4 import BeautifulSoup


# def month_to_number(month_name):
#     month_dict = {
#         "January": "01", "February": "02", "March": "03",
#         "April": "04", "May": "05", "June": "06",
#         "July": "07", "August": "08", "September": "09",
#         "October": "10", "November": "11", "December": "12"
#     }
#     return month_dict.get(month_name, "01")  # Default to January if not found

# def extract_date_and_auditee(url):
#     time.sleep(1)
#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, 'html.parser')

#     auditee = soup.find(id='hs_cos_wrapper_name').text.strip()
#     span_tags = soup.find_all('span')
#         # Filter out spans that have a class or an ID
#     for span in span_tags:
#         if not span.get('class') and not span.get('id'):
#             date_text = span.text.strip()
#             print(date_text)
#             date_match = re.search(r'(\w+)\s(\d{1,2}),\s(\d{4})', date_text)
#             if date_match:
#                 month, _, year = date_match.groups()
#                 formatted_date = f"{year}-{month_to_number(month)}"
#                 return auditee, formatted_date

# base_url = 'https://blog.openzeppelin.com/tag/security-audits/page/'
# auditor = 'OpenZeppelin'
# audit_reports = []

# for page in range(1, 18):  # 17 pages in total
#     url = f"{base_url}{page}"
#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, 'html.parser')

#     for link in soup.find_all("a", class_="blog-listing__post-title-link"):
#         href = link.get('href')
#         if href:
#             auditee, date = extract_date_and_auditee(href)
#             audit_reports.append({
#                 "id": len(audit_reports) + 1,
#                 "auditor": auditor,
#                 "auditee": auditee,
#                 "date": date,
#                 "report": href
#             })

# # Save the data to oz.json in the root directory
# with open('oz.json', 'w') as file:
#     json.dump(audit_reports, file, indent=4)

# print("Data saved to oz.json")

import json
import os

base_dir = (
    "../../../public/reports/OpenZeppelin"  # Replace with your base directory path
)
output_json = "example.json"
reports = []
id_counter = 1

# Walking through the directory structure
for auditee in os.listdir(base_dir):
    auditee_path = os.path.join(base_dir, auditee)
    if os.path.isdir(auditee_path):
        for date in os.listdir(auditee_path):
            date_path = os.path.join(auditee_path, date)
            if os.path.isdir(date_path):
                for file in os.listdir(date_path):
                    if file.endswith(".pdf"):
                        report_obj = {
                            "id": id_counter,
                            "auditor": "OpenZeppelin",
                            "auditee": auditee,
                            "date": date,
                            "report": "https://governance.felixschuler.at/reports/OpenZeppelin/"
                            + auditee
                            + "/"
                            + date
                            + "/"
                            + file,
                        }
                        reports.append(report_obj)
                        id_counter += 1

# Save the data to a JSON file
with open(output_json, "w") as json_file:
    json.dump(reports, json_file, indent=4)

print(f"Data saved to {output_json}")
