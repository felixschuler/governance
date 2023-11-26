import os


def format_folder_name(folder_name):
    """ Capitalize each word and replace hyphens with spaces. """
    return ' '.join(word.capitalize() for word in folder_name.replace('-', ' ').split())

def process_directories(base_dir):
    """ Process each directory in the base directory. """
    for folder in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder)

        if os.path.isdir(folder_path):
            # If the folder is empty, delete it
            if not os.listdir(folder_path):
                os.rmdir(folder_path)
                print(f"Deleted empty folder: {folder}")

# Set the path to the base directory
base_dir = '../public/reports/Hacken'
process_directories(base_dir)
