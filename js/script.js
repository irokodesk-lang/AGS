// ==========================================
// AGS Location - Scripts
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.padding = '0.5rem 2rem';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.padding = '0.8rem 2rem';
      navbar.style.boxShadow = 'none';
    }

    if (currentScroll > lastScroll && currentScroll > 500) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // --- Mobile menu toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.textContent = '☰';
    });
  });

  // --- Fleet filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      vehicleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Contact form handling ---
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual backend)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    setTimeout(() => {
      submitBtn.textContent = '✓ Message envoyé !';
      submitBtn.style.background = '#25D366';
      
      // Build WhatsApp message with form data
      let message = `Bonjour AGS Location,\n\nNouvelle demande de location :\n`;
      message += `Nom : ${data.nom || 'Non précisé'}\n`;
      message += `Téléphone : ${data.telephone || 'Non précisé'}\n`;
      if (data.email) message += `Email : ${data.email}\n`;
      if (data.typeVehicule) message += `Type : ${data.typeVehicule}\n`;
      if (data.duree) message += `Durée : ${data.duree}\n`;
      if (data.message) message += `Message : ${data.message}\n`;
      
      const whatsappUrl = `https://wa.me/22997328285?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.background = '';
      }, 1500);
      
    }, 1000);
  });

  // --- Scroll animations ---
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

  // Add animation classes to sections
  document.querySelectorAll('.service-card, .vehicle-card, .why-card, .pricing-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    observer.observe(el);
  });

  // --- Stat counter animation ---
  const statsSection = document.querySelector('.stats-bar');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasStar = text.includes('★');
        const numericValue = parseInt(text.replace(/\D/g, ''));
        
        if (!isNaN(numericValue)) {
          let current = 0;
          const increment = numericValue / 30;
          const suffix = hasPlus ? '+' : (hasStar ? '★' : '');
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              current = numericValue;
              clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
          }, 50);
        }
      });
    }
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);

});
