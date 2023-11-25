import os

base_dir = 'Hacken'  # Base directory containing the subdirectories

def format_folder_name(name):
    return ' '.join(word.capitalize() for word in name.split('-'))

def is_folder_empty(folder_path):
    return not os.listdir(folder_path)

for folder in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder)
    if os.path.isdir(folder_path):
        # Remove the folder if it's empty
        if is_folder_empty(folder_path):
            os.rmdir(folder_path)
            print(f"Removed empty folder '{folder}'")
            continue

        # Format the folder name by replacing hyphens with spaces and capitalizing each word
        new_folder_name = format_folder_name(folder)
        new_folder_path = os.path.join(base_dir, new_folder_name)

        # Rename the folder
        os.rename(folder_path, new_folder_path)
        print(f"Renamed '{folder}' to '{new_folder_name}'")