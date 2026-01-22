// 1. CONFIGURACIÓN GLOBAL DE IDIOMA
let currentLang = 'es';
const langToggle = document.getElementById('lang-switch');
const langOptions = document.querySelectorAll('.lang-opt');

langToggle.addEventListener('click', (e) => {
    const target = e.target.closest('.lang-opt');
    if (!target || target.classList.contains('active')) return;

    langOptions.forEach(opt => opt.classList.remove('active'));
    target.classList.add('active');

    currentLang = target.getAttribute('data-value');

    // Traducir elementos estáticos
    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) { el.innerHTML = text; }
    });

    // Reiniciar Typing Effect al cambiar idioma
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;

    updateBotLanguage(); 
});

// 2. TYPING EFFECT (Subtítulo dinámico arriba del párrafo)
const typingText = document.getElementById('typing-text');
const phrases = {
    es: [
        "Dashboards en línea.",
        "Reduzca costos operativos.",
        "Optimice procesos con IA."
    ],
    en: [
        "Online dashboards.",
        "Reduce operational costs.",
        "Optimize processes with AI."
    ]
};

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrases = phrases[currentLang];
    const currentFullText = currentPhrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentFullText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentFullText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentFullText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pausa antes de borrar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % currentPhrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// 3. LÓGICA DEL P&G BOT (Cerebro Expandido de Ingeniería)
const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat');
const typingIndicator = document.getElementById('typing-indicator');

const botResponses = {
    free: {
        es: "Nuestra **Automatización Gratis** consiste en identificar un proceso repetitivo y automatizarlo en 1-2 semanas para que compruebes el ahorro real.",
        en: "Our **Free Automation** consists of identifying a repetitive process and automating it in 1-2 weeks."
    },
    price: {
        es: "Packs desde **USD 300/mes**. Aceptamos transferencia bancaria, tarjetas de crédito y pagos vía Deel o Payoneer.",
        en: "Packs start at **USD 300/mo**. We accept bank transfers, credit cards, and payments via Deel or Payoneer."
    },
    tech: {
        es: "Somos expertos en el stack moderno: **GCP, Snowflake y Apache Airflow**. Construimos soluciones robustas con **Python y n8n**.",
        en: "We are experts in the modern stack: **GCP, Snowflake, and Apache Airflow**. We build robust solutions with **Python and n8n**."
    },
    bi: {
        es: "¡Claro! Desarrollamos **Dashboards interactivos** en tiempo real para que visualices tus KPIs y gráficos de rendimiento automáticamente.",
        en: "Of course! We develop real-time **interactive Dashboards** so you can visualize your KPIs and performance charts automatically."
    },
    time: {
        es: "Un proyecto promedio suele estar productivo en **2 a 4 semanas**, dependiendo de la complejidad de la arquitectura de datos.",
        en: "An average project is usually productive in **2 to 4 weeks**, depending on the complexity of the data architecture."
    },
    human: {
        es: "¡Excelente! Te derivaré con un **Consultor Especializado**. Puedes agendar directo aquí: <br><a href='https://calendly.com/santipaulin97/30min' target='_blank' style='color:#00E0FF'>📅 Agendar Llamada</a>",
        en: "Great! I'll refer you to a **Specialized Consultant**. You can book directly here: <br><a href='https://calendly.com/santipaulin97/30min' target='_blank' style='color:#00E0FF'>📅 Book a Call</a>"
    }
};

function showChatMenu() {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'chat-options';
    menuDiv.innerHTML = `
        <button class="chat-opt-btn" data-action="free">${currentLang === 'es' ? '🎁 Automatización Gratis' : '🎁 Free Automation'}</button>
        <button class="chat-opt-btn" data-action="price">${currentLang === 'es' ? '💰 Planes y Costos' : '💰 Plans & Costs'}</button>
        <button class="chat-opt-btn" data-action="tech">${currentLang === 'es' ? '🚀 Tecnologías' : '🚀 Technologies'}</button>
        <button class="chat-opt-btn" data-action="human">${currentLang === 'es' ? '👤 Consultor' : '👤 Consultant'}</button>
    `;
    chatBody.appendChild(menuDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

chatTrigger.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

document.getElementById('close-chat').addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(action) {
    typingIndicator.style.display = 'flex';
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        addMessage(botResponses[action][currentLang], 'bot');
        setTimeout(showChatMenu, 500);
    }, 1500);
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-opt-btn')) {
        const action = e.target.getAttribute('data-action');
        addMessage(e.target.innerText, 'user');
        e.target.parentElement.remove();
        botReply(action);
    }
});

// MOTOR DE INTELIGENCIA POR PALABRAS CLAVE
sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim().toLowerCase();
    if (text) {
        addMessage(chatInput.value, 'user');
        chatInput.value = '';
        
        if (text.includes('gratis') || text.includes('free')) botReply('free');
        else if (text.includes('precio') || text.includes('cost') || text.includes('paga') || text.includes('mes')) botReply('price');
        else if (text.includes('gcp') || text.includes('airflow') || text.includes('snowflake') || text.includes('python') || text.includes('n8n')) botReply('tech');
        else if (text.includes('grafic') || text.includes('dashboard') || text.includes('bi') || text.includes('ver datos')) botReply('bi');
        else if (text.includes('tiempo') || text.includes('tarda') || text.includes('plazo')) botReply('time');
        else if (text.includes('consultor') || text.includes('hablar') || text.includes('llamada')) botReply('human');
        else {
            typingIndicator.style.display = 'flex';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage(currentLang === 'es' ? "Como ingenieros de datos, podemos resolver eso. ¿Te gustaría hablar con un consultor o conocer nuestro stack tecnológico?" : "As data engineers, we can solve that. Would you like to talk to a consultant or see our tech stack?", 'bot');
                showChatMenu();
            }, 1200);
        }
    }
});

chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendBtn.click(); });

function updateBotLanguage() {
    chatInput.placeholder = chatInput.getAttribute(`data-${currentLang}-placeholder`);
    const existingMenu = document.querySelector('.chat-options');
    if (existingMenu) { existingMenu.remove(); showChatMenu(); }
}

// 4. ANIMACIONES Y CARGA INICIAL
window.addEventListener('DOMContentLoaded', () => {
    typeEffect(); // Iniciar efecto de escritura
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    chatInput.placeholder = chatInput.getAttribute(`data-${currentLang}-placeholder`);
});

// 5. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
    });
});
