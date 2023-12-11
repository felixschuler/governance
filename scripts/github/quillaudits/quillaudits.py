import json
import os
import re
import shutil

# Define the paths
json_file_path = "quillaudits.json"
reports_base_dir = "../../../public/reports/QuillAudits"

# Load data from JSON file
with open(json_file_path, "r") as file:
    data = json.load(file)


# Function to create directory and move file
def create_dir_and_move_file(auditee, date, file_name):
    target_dir = os.path.join(reports_base_dir, auditee, date)
    os.makedirs(target_dir, exist_ok=True)
    source_file_path = os.path.join(reports_base_dir, file_name)
    if os.path.exists(source_file_path):
        target_file_path = os.path.join(target_dir, file_name)
        shutil.move(source_file_path, target_file_path)
        print(f"Moved '{file_name}' to '{target_dir}'")


# Process each object in the array
for item in data:
    report_url = item["report"]
    auditee = item["auditee"]
    date = item["date"]

    # Extract fileName from the report URL
    match = re.search(
        r"https://governance.felixschuler.at/reports/QuillAudits/.+?/.+?/(.+\.pdf)",
        report_url,
    )
    if match:
        file_name = match.group(1)
        create_dir_and_move_file(auditee, date, file_name)

print("Files have been reorganized.")
