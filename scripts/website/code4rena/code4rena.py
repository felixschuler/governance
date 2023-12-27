# import json


# def capitalize_auditee(data):
#     for item in data:
#         item["auditee"] = item["auditee"].capitalize()
#     return data


# # Read the existing data
# with open("code4rena.json", "r") as file:
#     data = json.load(file)

# # Capitalize the first letter of each auditee
# updated_data = capitalize_auditee(data)

# # Write the updated data back to the file
# with open("code4rena.json", "w") as file:
#     json.dump(updated_data, file, indent=4)

# print("Updated the auditee names in code4rena.json")

import json
import os

base_dir = "../../../public/reports/code4rena"  # Replace with your base directory path
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
                            "auditor": "code4rena",
                            "auditee": auditee,
                            "date": date,
                            "report": "https://governance.felixschuler.at/reports/code4rena/"
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
