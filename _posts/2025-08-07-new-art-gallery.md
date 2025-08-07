---
layout: default
title: New Art Gallery Page
description: About the new art gallery page
categories: [""]
date: 2025-08-07 13:04:51
---
I have been working slowly on adding more functionality to this website, and most recently I am happy with how my art gallery page updates have been going. I'll walk through how I set this up in case anyone else wants to add something similar to their Jekyll site.

This site is hosted with Github Pages, which means that all of the code for it is available publicly to view in its Github repo: https://github.com/tvaz/tvaz.github.io. I originally based the site on a theme called [Scribble](https://github.com/muan/scribble/), which is unfortunately no longer maintained, but I have made some changes over time to suit my needs.

First, I added some images I wanted to include to the a directory in the Jekyll root under `images/gallery/`. At first, I just iterated through all of the files in this directory and displayed them, but that left me without any way to add useful metadata such as descriptions and titles for the images. A database would be overkill for the size of this site, so I decided a flat file storage as a JSON would be sufficient to hold this data.

Before we can add the metadata, we need to generate the basic JSON structure. I added a folder called `_data/` and created a Python script, called `generate-gallery.py`. This Python script simply iterates through the gallery directory, and creates an entry in a JSON array for each filename. If the filename already exists, it skips adding or modifying it, allowing us to update the data as new images are added to the folder, by running the script again.

Here is the key logic of the script:

```
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
```

The script stores this data in `_data/gallery.json`. Once generated, descriptions and titles can be added manually. Dates are automatically grabbed from the file's metadata, but this feature will probably only be useful for new additions, since the image files I have for my gallery are not original and do not have accurate dates to when I originally created them. Because of this, my gallery supports the date field being empty.

Now that we have this data all tidy in a JSON, the JavaScript in the gallery page can consume it and take care of all of the DOM manipulation to make the lightbox work.

```js
{% raw %}
const galleryData = [
  {% for image in site.data.gallery %}
    {
      filename: "{{ image.filename }}",
      title: "{{ image.title }}",
      date: "{{ image.date }}",
      description: "{{ image.description }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];
{% endraw %}
```

The HTML can show the image thumbnails by iterating through the data:
```html
{% raw %}
    <div class="gallery">
    {% for image in site.data.gallery %}
        <a href="#{{ image.filename }}" title="{{ image.filename }}">
            <img src="{{ 'images/gallery/' | append: image.filename | relative_url }}" title="{{ image.title }}" alt="{{ image.description }}" class="thumbnail"/>
        </a>
    {% endfor %}
    </div>
{% endraw %}
```

Then, we can create an updateImage function that will change the currently focused image in the lightbox:
```js
      function updateImage(index) {
        if (!galleryData[index]) return;

        img.classList.add('fade-out');
        setTimeout(() => {
          img.src = img.src = 'images/gallery/' + galleryData[index].filename;
          img.classList.remove('fade-out');
        }, 300);

        currentIndex = index;

        // Update details
        const data = galleryData[index];
        if (data) {
          caption.textContent = data.title || "";

        if (data.date) {
          const rawDate = new Date(data.date);
          // ... some logic to support if the date field is empty
        }
          description.textContent = data.description || "";
        }
      }
```

Hook the function up with some listeners on the buttons and we have a gallery complete with the metadata from our JSON!

Feel free to look through the complete code in the public repo if you want to see exactly how it works. It's not exceptionally fancy, but its nice that I have a centralized place to display all of my work without having to rely on something external like a social media page. A modified version of the same code is running the gallery on my crochet page, which currently only has a few images of my work. Unfortunately, I have not taken enough high quality photos of my crochet work, and that is something I am working on. Hopefully I will have new work to upload to the site for these pages soon. :)

[Public Github Repo](https://github.com/tvaz/tvaz.github.io)