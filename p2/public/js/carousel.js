document.addEventListener("DOMContentLoaded", function() {
    const images = [
        'images/recipe1.jpg',
        'images/recipe2.jpg',
        'images/recipe3.jpg',
        'images/recipe4.jpg'
    ];
    let currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        document.getElementById('carousel-img').src = images[currentIndex];
    }

    setInterval(showNextImage, 3000);
});
