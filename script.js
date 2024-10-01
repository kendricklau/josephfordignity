document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Hero Carousel
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroCarousel) {
        console.log('Hero carousel element found:', heroCarousel);

        const carouselInner = heroCarousel.querySelector('.carousel-inner');
        if (carouselInner) {
            console.log('Carousel inner element found:', carouselInner);

            const images = [
                'img/main-carousel-1.png',
                'img/main-carousel-2.png',
                'img/main-carousel-3.png',
                'img/main-carousel-4.png',
                'img/main-carousel-5.png'
            ];

            let currentIndex = 0;

            function loadCarouselImages() {
                console.log('Loading carousel images');
                carouselInner.innerHTML = '';
                images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `Carousel Image ${index + 1}`;
                    img.classList.add('w-full', 'h-full', 'object-cover', 'flex-shrink-0');
                    carouselInner.appendChild(img);
                    console.log(`Added image: ${src}`);
                    
                    // Check if the image loads successfully
                    img.onload = () => {
                        console.log(`Image loaded successfully: ${src}`);
                        console.log(`Image dimensions: ${img.width}x${img.height}`);
                    };
                    img.onerror = () => console.error(`Failed to load image: ${src}`);
                });
                console.log('Carousel images loaded');
                console.log('Carousel inner HTML:', carouselInner.innerHTML);
            }

            function moveCarousel() {
                currentIndex = (currentIndex + 1) % images.length;
                carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
                console.log(`Moved to image index: ${currentIndex}`);
            }

            loadCarouselImages();
            setInterval(moveCarousel, 5000); // Change image every 5 seconds

            // Log the computed styles of the carousel and its inner element
            console.log('Carousel computed styles:', window.getComputedStyle(heroCarousel));
            console.log('Carousel inner computed styles:', window.getComputedStyle(carouselInner));

            // Add this after loadCarouselImages();
            console.log('Carousel dimensions:', heroCarousel.offsetWidth, heroCarousel.offsetHeight);
            console.log('Carousel inner dimensions:', carouselInner.offsetWidth, carouselInner.offsetHeight);
        } else {
            console.error('Carousel inner element not found');
        }
    } else {
        console.error('Hero carousel element not found');
    }

    // Sticky navigation
    const nav = document.getElementById('sticky-nav');
    if (nav) {
        const navTop = nav.offsetTop;

        function stickyNav() {
            if (window.scrollY >= navTop) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        }

        // Highlight active section in nav
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('#sticky-nav a');

        function highlightNavLink() {
            let scrollY = window.pageYOffset;
            
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - nav.offsetHeight - 50; // Adjust for nav height
                const sectionId = current.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', () => {
            stickyNav();
            highlightNavLink();
        });

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    } else {
        console.error('Sticky nav element not found');
    }

    // Country Carousel
    const countryCarousel = document.getElementById('country-carousel');
    const carouselInner = countryCarousel.querySelector('.carousel-inner');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const countryCards = document.querySelectorAll('.country-card');

    let currentIndex = 0;
    const countries = ['ukraine', 'thailand', 'mongolia', 'vietnam', 'uganda', 'nepal', 'indonesia'];
    
    function updateCarousel(country) {
        carouselInner.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            img.src = `img/${country}-${i}.jpg`;
            img.alt = `${country.charAt(0).toUpperCase() + country.slice(1)} Image ${i}`;
            img.classList.add('w-full', 'h-full', 'object-cover', 'absolute', 'top-0', 'left-0');
            if (i > 1) {
                img.classList.add('hidden');
            }
            carouselInner.appendChild(img);
        }
        currentIndex = 0;
    }

    function showImage(index) {
        const images = carouselInner.querySelectorAll('img');
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.remove('hidden');
            } else {
                img.classList.add('hidden');
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % 3;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + 3) % 3;
        showImage(currentIndex);
    }

    countryCards.forEach(card => {
        card.addEventListener('click', () => {
            const country = card.dataset.country;
            updateCarousel(country);
            countryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    // Initialize with the first country
    updateCarousel(countries[0]);
    countryCards[0].classList.add('active');

    // Auto-advance carousel every 5 seconds
    setInterval(nextImage, 5000);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});