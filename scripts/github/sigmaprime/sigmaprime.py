import os


def rename_pdf_in_folder(folder_path, new_name):
    for file in os.listdir(folder_path):
        if file.endswith(".pdf"):
            old_file_path = os.path.join(folder_path, file)
            new_file_path = os.path.join(folder_path, f"{new_name}.pdf")
            os.rename(old_file_path, new_file_path)
            print(f"Renamed {file} to {new_name}.pdf")


def process_directory(base_dir):
    for entry in os.listdir(base_dir):
        full_path = os.path.join(base_dir, entry)

        if os.path.isdir(full_path):
            # If it's a folder, check for PDFs and subfolders inside it
            rename_pdf_in_folder(full_path, entry)
            for sub_entry in os.listdir(full_path):
                sub_full_path = os.path.join(full_path, sub_entry)
                if os.path.isdir(sub_full_path):
                    rename_pdf_in_folder(sub_full_path, sub_entry)


# Replace with the path to your directory
base_directory = "../public/reports/sigma prime"
process_directory(base_directory)
