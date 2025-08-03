document.addEventListener("DOMContentLoaded", () => {

  const imagePaths = [
    {% for file in include.image_files %}
      "{{ file.path | relative_url }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  console.log("Image paths:", imagePaths);

  document.querySelectorAll('.lightbox').forEach(lightbox => {
        const closeBtn = lightbox.querySelector('.close');
        const left = lightbox.querySelector('.arrow.left');
        const right = lightbox.querySelector('.arrow.right');
        const img = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.caption');

        let currentIndex;
        
        // Initialize currentIndex when lightbox is targeted
        function initializeIndex() {
            const filename = img.getAttribute('src').split('/').pop();
            console.log("Initializing index for filename:", filename);
            currentIndex = imagePaths.findIndex(item => item.includes(filename));
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
            if (!imagePaths[index]) return;
            img.classList.add('fade-out');
            setTimeout(() => {
            img.src = imagePaths[index];
            img.classList.remove('fade-out');
            }, 300);
            currentIndex = index;
        }

        left.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
            updateImage(newIndex);
        });

        right.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % imagePaths.length;
            updateImage(newIndex);
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
  });
});