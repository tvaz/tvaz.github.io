document.addEventListener("DOMContentLoaded", () => {

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


  document.querySelectorAll('.lightbox').forEach(lightbox => {
        const closeBtn = lightbox.querySelector('.close');
        const left = lightbox.querySelector('.arrow.left');
        const right = lightbox.querySelector('.arrow.right');
        const img = lightbox.querySelector('.lightbox-image');
        // Need to add these to the update function
        const caption = lightbox.querySelector('.caption');
        const date = lightbox.querySelector('.date');
        const description = lightbox.querySelector('.description');

        let currentIndex;
        
        // Initialize currentIndex when lightbox is targeted
        function initializeIndex() {
            const filename = img.getAttribute('src').split('/').pop();
            console.log("Initializing index for filename:", filename);
            currentIndex = galleryData.findIndex(item => item.filename === filename);
        }
 
        // Listen for hashchange to detect lightbox activation
        window.addEventListener('hashchange', () => {
            if (location.hash === `#${lightbox.id}`) {
            initializeIndex();
            }
        });

        // Also fire immediately on page load if the hash matches
        if (location.hash === `#${lightbox.id}`) {
            initializeIndex();
        }
        
      function updateImage(index) {
        console.log("Updating image to index:", index);
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
          if (!isNaN(rawDate)) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            date.textContent = rawDate.toLocaleDateString(undefined, options);
          } else {
            date.textContent = "";
          }
        } else {
          date.textContent = "";
        }

          description.textContent = data.description || "";
        }
      }


        left.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateImage(newIndex);
        });

        right.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % galleryData.length;
            updateImage(newIndex);
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
  });
});