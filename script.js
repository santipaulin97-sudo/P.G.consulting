// 1. SELECTOR DE IDIOMAS (Lógica de Pastilla/Toggle)
const langToggle = document.getElementById('lang-switch');
const langOptions = document.querySelectorAll('.lang-opt');
let currentLang = 'es';

langToggle.addEventListener('click', (e) => {
    // Detectamos si se hizo clic en una de las opciones (ES o EN)
    const target = e.target.closest('.lang-opt');
    
    // Si no se hizo clic en una opción o ya está activa, no hacemos nada
    if (!target || target.classList.contains('active')) return;

    // 1.1. Actualización Visual: Movemos el círculo azul
    langOptions.forEach(opt => opt.classList.remove('active'));
    target.classList.add('active');

    // 1.2. Actualización de Idioma
    currentLang = target.getAttribute('data-value');

    // 1.3. Traducción de todos los elementos con data-es/data-en
    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            // Usamos innerHTML para que las negritas y listas se vean bien
            el.innerHTML = text; 
        }
    });
});

// 2. REVELACIÓN AL HACER SCROLL (Animaciones de entrada)
const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

window.addEventListener('DOMContentLoaded', revealOnScroll);

// 3. SMOOTH SCROLL (Navegación fluida por la página)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
