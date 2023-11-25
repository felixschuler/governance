import json
import os

# Setting up relative paths based on the script's location
script_dir = os.path.dirname(__file__)
base_dir = os.path.join(script_dir, '../public/reports')
output_file = os.path.join(script_dir, '../src/audits.json')
audit_reports = []

# Function to iterate through the directories and generate report entries
def process_reports():
    id_counter = 1
    for auditor in os.listdir(base_dir):
        auditor_path = os.path.join(base_dir, auditor)
        if os.path.isdir(auditor_path):
            for auditee in os.listdir(auditor_path):
                auditee_path = os.path.join(auditor_path, auditee)
                if os.path.isdir(auditee_path):
                    for date in os.listdir(auditee_path):
                        date_path = os.path.join(auditee_path, date)
                        if os.path.isdir(date_path):
                            for report in os.listdir(date_path):
                                if report.endswith('.pdf'):
                                    report_path = f"https://governance.felixschuler.at/reports/{auditor}/{auditee}/{date}/{report}"
                                    audit_reports.append({
                                        "id": id_counter,
                                        "auditor": auditor,
                                        "auditee": auditee,
                                        "date": date,
                                        "report": report_path
                                    })
                                    id_counter += 1

# Process the reports and generate the JSON file
process_reports()
with open(output_file, 'w') as f:
    json.dump(audit_reports, f, indent=4)

print(f"JSON file generated: {output_file}")
