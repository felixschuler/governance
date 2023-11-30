import json


def capitalize_auditee(data):
    for item in data:
        item["auditee"] = item["auditee"].capitalize()
    return data


# Read the existing data
with open("code4rena.json", "r") as file:
    data = json.load(file)

# Capitalize the first letter of each auditee
updated_data = capitalize_auditee(data)

# Write the updated data back to the file
with open("code4rena.json", "w") as file:
    json.dump(updated_data, file, indent=4)

print("Updated the auditee names in code4rena.json")
