// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabsWrapper = document.querySelector('.tabs-content-wrapper');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Find and scroll to the target panel
            const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
            if (targetPanel && tabsWrapper) {
                // Calculate scroll position
                const scrollLeft = targetPanel.offsetLeft - tabsWrapper.offsetLeft - 20;
                tabsWrapper.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If this item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// Video scaling and lock functionality
let videoLocked = false;
let videoPlayed = false;

const videoSection = document.getElementById('videoSection');
const videoWrapper = document.getElementById('videoWrapper');
const scalingVideo = document.getElementById('scalingVideo');

if (videoSection && videoWrapper && scalingVideo) {
    window.addEventListener('scroll', function() {
        if (videoLocked) return;

        const rect = videoSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate progress through the section
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / windowHeight));

        if (scrollProgress > 0 && scrollProgress < 1) {
            // Scale from 0.75 to 0.85 as user scrolls
            const scale = 0.75 + (scrollProgress * 0.10);
            scalingVideo.style.transform = `scale(${scale})`;

            // Lock when scale reaches 0.85
            if (scale >= 0.85 && !videoLocked) {
                lockVideo();
            }
        }
    });

    function lockVideo() {
        videoLocked = true;
        videoWrapper.classList.add('locked');
        document.body.style.overflow = 'hidden';

        // Autoplay video
        scalingVideo.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });

        // Unlock after 2 seconds or when video starts playing
        setTimeout(unlockVideo, 2000);
    }

    function unlockVideo() {
        if (!videoPlayed) {
            videoPlayed = true;
            document.body.style.overflow = 'auto';

            // Keep video at 0.85 scale after unlocking
            setTimeout(() => {
                videoWrapper.classList.remove('locked');
            }, 500);
        }
    }
}
