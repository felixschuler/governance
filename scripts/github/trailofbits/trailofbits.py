# import json
# import re

# # Load data from JSON file
# json_file_path = "trailofbits.json"  # Replace with your actual JSON file path

# with open(json_file_path, "r") as file:
#     data = json.load(file)

# # Process each object in the array
# for item in data:
#     # Remove the pattern (e.g., "2021-04-") from the auditee field
#     item["auditee"] = re.sub(r"^\d{4}-\d{2}-", "", item["auditee"])

# # Save the updated data back to the JSON file
# with open(json_file_path, "w") as file:
#     json.dump(data, file, indent=4)

# print("Updated the auditee names in the JSON file.")


# import json
# import os
# import re

# # Load data from JSON file
# json_file_path = "trailofbits.json"  # Replace with your actual JSON file path

# with open(json_file_path, "r") as file:
#     data = json.load(file)

# # Process each object in the array
# for item in data:
#     # Extract the file name from the original report URL
#     file_name_match = re.search(r"/([^/]+\.pdf)$", item["report"])
#     if file_name_match:
#         file_name = file_name_match.group(1)
#         # Construct the new report URL
#         item[
#             "report"
#         ] = f"https://governance.felixschuler.at/reports/{item['auditor']}/{item['auditee']}/{item['date']}/{file_name}"

# # Save the updated data back to the JSON file
# with open(json_file_path, "w") as file:
#     json.dump(data, file, indent=4)

# print("Updated the report URLs in the JSON file.")

import json
import os
import re
import shutil

# Define the paths
json_file_path = "trailofbits.json"
reports_base_dir = "../../../public/reports/Trail of Bits"

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
        r"https://governance.felixschuler.at/reports/Trail of Bits/.+?/.+?/(.+\.pdf)",
        report_url,
    )
    if match:
        file_name = match.group(1)
        create_dir_and_move_file(auditee, date, file_name)

print("Files have been reorganized.")
