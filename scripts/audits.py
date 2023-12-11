import json

# File path to the audits.json
file_path = "../src/audits.json"

# Load the JSON data from the file
with open(file_path, "r") as file:
    audits = json.load(file)

# Update the ID for each audit
for i, audit in enumerate(audits, start=1):
    audit["id"] = i

# Write the updated data back to the file
with open(file_path, "w") as file:
    json.dump(audits, file, indent=2)

print("Audit IDs have been updated.")
