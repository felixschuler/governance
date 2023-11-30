import json
import os
import shutil

# Paths
quantstamp_dir = "../public/reports/Quantstamp"
json_file_path = os.path.join("quantstamp.json")

# Load data from JSON file
with open(json_file_path, "r") as file:
    quantstamp_data = json.load(file)

# Create a mapping of report URL to object
report_mapping = {obj["report"].split("/")[-1]: obj for obj in quantstamp_data}

# Iterate through PDF files and move them based on JSON data
for filename in os.listdir(quantstamp_dir):
    if filename.endswith(".pdf"):
        if filename in report_mapping:
            obj = report_mapping[filename]
            target_dir = os.path.join(quantstamp_dir, obj["auditee"], obj["date"])
            os.makedirs(target_dir, exist_ok=True)
            shutil.move(
                os.path.join(quantstamp_dir, filename),
                os.path.join(target_dir, filename),
            )
            print(f"Moved {filename} to {target_dir}")

print("Files have been reorganized.")

# import json
# import re


# # Function to sanitize folder names
# def sanitize_folder_name(name):
#     return re.sub(r'[\\/*?:"<>|,]', "", name)


# # Load data from JSON file
# json_file_path = "quantstamp.json"
# with open(json_file_path, "r") as file:
#     data = json.load(file)

# # Sanitize the auditee names
# sanitized = False
# for item in data:
#     sanitized_auditee = sanitize_folder_name(item["auditee"])
#     if sanitized_auditee != item["auditee"]:
#         item["auditee"] = sanitized_auditee
#         sanitized = True

# # Save the updated data if any changes were made
# if sanitized:
#     with open(json_file_path, "w") as file:
#         json.dump(data, file, indent=4)
#     print("The data has been sanitized and saved.")
# else:
#     print("No changes were necessary.")
