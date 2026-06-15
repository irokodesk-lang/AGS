// ============================================
// NAVIGATION
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// NAVIGATION ACTIVE
// ============================================
const sections = document.querySelectorAll('section');
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Header shadow on scroll
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
});

// ============================================
// GALERIE MODAL
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.gallery-close');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        currentImageIndex = index;
        modalImg.src = images[currentImageIndex];
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentImageIndex];
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    modalImg.src = images[currentImageIndex];
});

// Navigation clavier dans la galerie
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentImageIndex];
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            modalImg.src = images[currentImageIndex];
        } else if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    }
});

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Ici vous pouvez ajouter votre logique d'envoi
    console.log('Données du formulaire:', data);
    
    // Message de confirmation
    alert('Merci pour votre demande ! Nous vous contacterons dans les plus brefs délais.');
    
    // Réinitialiser le formulaire
    contactForm.reset();
});

// ============================================
// BOUTON SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Éléments à animer
const animatedElements = document.querySelectorAll('.service-card, .fleet-card, .pricing-card, .testimonial-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// CHARGEMENT DE LA PAGE
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});