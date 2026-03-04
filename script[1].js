/**
 * Gushwork Assignment - Script
 * Vanilla JavaScript implementation of features.
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initCarousel();
});

/**
 * Feature 1: Sticky Header
 */
function initStickyHeader() {
    const stickyHeader = document.querySelector('.sticky-header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Show sticky header after scrolling beyond first fold (100vh)
        if (currentScrollY > viewportHeight) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Feature 2: Image Carousel with Zoom
 */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const zoomPreview = document.querySelector('.zoom-preview');
    const mobileOverlay = document.querySelector('.mobile-zoom-overlay');
    const mobileOverlayImg = mobileOverlay.querySelector('img');

    let currentIndex = 0;
    const slideCount = slides.length;

    // Update Carousel Position
    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Navigation
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });

    // Zoom Functionality
    slides.forEach(slide => {
        const img = slide.querySelector('img');

        // Desktop Hover Zoom
        slide.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {
                zoomPreview.style.display = 'block';
                zoomPreview.style.backgroundImage = `url(${img.src})`;
                zoomPreview.style.backgroundSize = `${img.naturalWidth}px ${img.naturalHeight}px`;
            }
        });

        slide.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1024) {
                const rect = slide.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;

                // Smoothly follow cursor
                zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
            }
        });

        slide.addEventListener('mouseleave', () => {
            zoomPreview.style.display = 'none';
        });

        // Mobile Tap Zoom
        slide.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                mobileOverlayImg.src = img.src;
                mobileOverlay.style.display = 'flex';
            }
        });
    });

    // Close Mobile Zoom
    mobileOverlay.addEventListener('click', () => {
        mobileOverlay.style.display = 'none';
    });
}
