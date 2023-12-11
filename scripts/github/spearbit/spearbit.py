# import json
# import os

# # Define the paths
# json_file_path = (
#     "spearbit.json"  # Replace 'your_json_file.json' with your actual file name
# )
# reports_base_dir = "../public/reports/Spearbit"

# # Load data from JSON file
# with open(json_file_path, "r") as file:
#     data = json.load(file)

# # Create directories based on the auditee and date fields
# for item in data:
#     auditee_dir = os.path.join(reports_base_dir, item["auditee"])
#     date_dir = os.path.join(auditee_dir, item["date"])

#     if not os.path.exists(date_dir):
#         os.makedirs(date_dir)
#         print(f"Created directory: {date_dir}")

# print("Directory creation process completed.")

import json
import os
import re
import shutil

# Define the paths
json_file_path = "spearbit.json"
reports_base_dir = "../../../public/reports/SpearBit"

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
        r"https://governance.felixschuler.at/reports/SpearBit/.+?/.+?/(.+\.pdf)",
        report_url,
    )
    if match:
        file_name = match.group(1)
        create_dir_and_move_file(auditee, date, file_name)

print("Files have been reorganized.")
