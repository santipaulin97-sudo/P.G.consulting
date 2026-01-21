const langBtn = document.getElementById('lang-switch');
let currentLang = 'es';

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    langBtn.innerText = currentLang === 'es' ? 'EN' : 'ES';

    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            // USAMOS innerHTML para procesar los tags de <strong> y <li> correctamente
            el.innerHTML = text; 
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
