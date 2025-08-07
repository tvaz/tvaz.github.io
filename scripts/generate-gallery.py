import os
import json
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS

IMAGE_DIR = "../images/gallery"
OUTPUT_JSON = "../_data/gallery.json"

def get_image_date(filepath):
    try:
        image = Image.open(filepath)
        exif_data = image._getexif()
        if exif_data:
            for tag_id, value in exif_data.items():
                tag = TAGS.get(tag_id, tag_id)
                if tag == 'DateTimeOriginal':
                    return datetime.strptime(value, '%Y:%m:%d %H:%M:%S').isoformat()
    except Exception as e:
        print(f"Error reading metadata for {filepath}: {e}")
    return datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat()

def generate_title(filename):
    name = os.path.splitext(filename)[0]
    return name.replace('-', ' ').replace('_', ' ').title()

def load_existing_data(json_file):
    if os.path.exists(json_file):
        with open(json_file, "r") as f:
            return json.load(f)
    return []

def build_gallery_json(image_dir, existing_data):
    existing_filenames = {entry['filename'] for entry in existing_data}
    new_entries = []
    
    for fname in os.listdir(image_dir):
        if fname.lower().endswith((".jpg", ".jpeg", ".png")) and fname not in existing_filenames:
            path = os.path.join(image_dir, fname)
            new_entries.append({
                "filename": fname,
                "title": generate_title(fname),
                "date": get_image_date(path),
                "description": ""
            })
    
    return existing_data + new_entries

if __name__ == "__main__":
    existing = load_existing_data(OUTPUT_JSON)
    updated = build_gallery_json(IMAGE_DIR, existing)
    with open(OUTPUT_JSON, "w") as f:
        json.dump(updated, f, indent=2)
    print(f"Updated metadata saved to {OUTPUT_JSON}")
