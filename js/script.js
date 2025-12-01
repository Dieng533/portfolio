/* ===== VARIABLES GLOBALES ===== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let themeIcon = document.querySelector('#theme-icon');
let body = document.body;
let whatsappBtn = document.querySelector('#whatsapp-btn');
let whatsappInput = document.querySelector('#whatsapp-number');

/* ===== TOGGLE MENU MOBILE ===== */
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ===== FERMER LE MENU AU CLIC SUR UN LIEN ===== */
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/* ===== TOGGLE MODE SOMBRE/CLAIR ===== */
themeIcon.onclick = () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('bxs-moon');
        themeIcon.classList.add('bxs-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('bxs-sun');
        themeIcon.classList.add('bxs-moon');
        localStorage.setItem('theme', 'light');
    }
};

/* ===== CHARGER LE THÈME SAUVEGARDÉ ===== */
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('bxs-moon');
        themeIcon.classList.add('bxs-sun');
    } else {
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('bxs-sun');
        themeIcon.classList.add('bxs-moon');
    }
});

/* ===== NAVIGATION ACTIVE AU SCROLL ===== */
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /* ===== STICKY HEADER ===== */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* ===== FERMER LE MENU MOBILE AU SCROLL ===== */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ===== ANIMATIONS SCROLL REVEAL ===== */
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

ScrollReveal().reveal('.home-content, .heading', { 
    origin: 'top' 
});
ScrollReveal().reveal('.home-img, .services-box, .portfolio-box, .contact-form', { 
    origin: 'bottom' 
});
ScrollReveal().reveal('.home-content h1, .about-img', { 
    origin: 'left' 
});
ScrollReveal().reveal('.home-content p, .about-content', { 
    origin: 'right' 
});

/* ===== TYPED JS ANIMATION ===== */
const typed = new Typed('.multi-txt', {
    strings: [
        'Développeur Full Stack',
        'Formateur en Développement Web',
        'Spécialiste Bureautique',
        'Architecte Web & Mobile'
    ],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

/* ===== FORMULAIRE WHATSAPP ===== */
whatsappBtn.addEventListener('click', () => {
    const phoneNumber = '225775335720'; // Votre numéro au format international
    let message = "Bonjour Aly, je viens de voir votre portfolio et je souhaiterais discuter d'un projet.";
    
    if (whatsappInput.value) {
        message += ` Mon numéro: ${whatsappInput.value}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

/* ===== FORMULAIRE DE CONTACT ===== */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulation d'envoi (à remplacer par votre backend)
    console.log('Données du formulaire:', data);
    
    // Affichage d'un message de confirmation
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    
    // Réinitialisation du formulaire
    contactForm.reset();
    
    // Redirection vers WhatsApp si un numéro est fourni
    if (data.whatsapp) {
        const phoneNumber = '225775335720';
        const message = encodeURIComponent(
            `Bonjour Aly, je viens de vous envoyer un message via votre portfolio. ` +
            `Mon message: ${data.message}. ` +
            `Cordialement, ${data.name}`
        );
        
        setTimeout(() => {
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        }, 1000);
    }
});

/* ===== ANIMATION DES PROGRESS BARS ===== */
function animateSkills() {
    const skills = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease-in-out';
                    entry.target.style.width = width;
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skills.forEach(skill => observer.observe(skill));
}

// Initialiser l'animation des skills
window.addEventListener('load', animateSkills);

/* ===== COMPTEUR DE STATISTIQUES ===== */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Observer pour déclencher l'animation
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(entries[0].target);
            }
        });
        
        observer.observe(counter);
    });
}

// Ajouter cette fonction si vous ajoutez des compteurs dans le HTML
// window.addEventListener('DOMContentLoaded', animateCounters);

/* ===== SMOOTH SCROLL POUR LES ANCRES ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});