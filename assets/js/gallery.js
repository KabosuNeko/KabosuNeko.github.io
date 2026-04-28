var galleryFiles = [
    'photo_1_2026-04-18_16-19-12.jpg',
    'photo_2_2026-04-18_15-26-06.jpg',
    'photo_3_2026-04-18_15-26-06.jpg',
    'photo_3_2026-04-18_16-19-12.jpg',
    'photo_4_2026-04-18_15-26-06.jpg',
    'photo_5_2026-04-18_15-26-06.jpg',
    'photo_6_2026-04-18_15-26-06.jpg',
    'photo_7_2026-04-18_15-26-06.jpg',
    'photo_8_2026-04-18_15-26-06.jpg',
    'photo_9_2026-04-18_15-26-06.jpg',
    'photo_10_2026-04-18_15-26-06.jpg',
    'photo_11_2026-04-18_15-26-06.jpg',
    'photo_12_2026-04-18_15-26-06.jpg',
    'photo_13_2026-04-18_15-26-06.jpg',
    'photo_2026-04-18_16-21-14.jpg'
];

var currentImageIndex = 0;

function loadGallery() {
    var grid = document.getElementById('galleryGrid');
    if (galleryFiles.length === 0) return;
    grid.innerHTML = '';
    galleryFiles.forEach(function(filename, index) {
        var item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = function() { openLightbox(index); };
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        var img = document.createElement('img');
        img.src = 'assets/gallery/' + filename;
        img.alt = filename.split('.')[0].replace(/[-_]/g, ' ');
        img.loading = 'lazy';
        item.appendChild(img);
        grid.appendChild(item);
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    var lightbox = document.getElementById('lightbox');
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleLightboxKeys);
}

function closeLightbox(e) {
    if (e && e.target.classList.contains('lightbox-nav')) return;
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeys);
}

function changeImage(direction, e) {
    if (e) e.stopPropagation();
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = galleryFiles.length - 1;
    if (currentImageIndex >= galleryFiles.length) currentImageIndex = 0;
    updateLightboxImage();
}

function updateLightboxImage() {
    var filename = galleryFiles[currentImageIndex];
    document.getElementById('lightboxImg').src = 'assets/gallery/' + filename;
    document.getElementById('lightboxCaption').textContent = (currentImageIndex + 1) + ' / ' + galleryFiles.length;
}

function handleLightboxKeys(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
}

document.addEventListener('DOMContentLoaded', loadGallery);
