import os

# Paths relative to the script location
script_dir = os.path.dirname(__file__)
base_dir = os.path.join(script_dir, '../public/reports')

for auditor in os.listdir(base_dir):
    auditor_path = os.path.join(base_dir, auditor)
    if os.path.isdir(auditor_path):
        for auditee in os.listdir(auditor_path):
            auditee_path = os.path.join(auditor_path, auditee)
            if os.path.isdir(auditee_path):
                for date_folder in os.listdir(auditee_path):
                    date_folder_path = os.path.join(auditee_path, date_folder)
                    if os.path.isdir(date_folder_path) and '.' in date_folder:
                        # Split the folder name assuming format "MM.YYYY"
                        parts = date_folder.split('.')
                        if len(parts) == 2 and len(parts[0]) == 2 and len(parts[1]) == 4:
                            new_folder_name = f"{parts[1]}-{parts[0]}"  # Reformat to "YYYY-MM"
                            new_folder_path = os.path.join(auditee_path, new_folder_name)

                            # Rename the folder
                            os.rename(date_folder_path, new_folder_path)
                            print(f"Renamed '{date_folder}' to '{new_folder_name}'")
