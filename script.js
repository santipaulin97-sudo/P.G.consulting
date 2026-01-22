// 1. CONFIGURACIÓN GLOBAL DE IDIOMA
let currentLang = 'es';
const langToggle = document.getElementById('lang-switch');
const langOptions = document.querySelectorAll('.lang-opt');

// 2. LÓGICA DEL SELECTOR DE IDIOMAS
langToggle.addEventListener('click', (e) => {
    const target = e.target.closest('.lang-opt');
    if (!target || target.classList.contains('active')) return;

    langOptions.forEach(opt => opt.classList.remove('active'));
    target.classList.add('active');

    currentLang = target.getAttribute('data-value');

    // Traducir elementos con data-es/en
    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) { el.innerHTML = text; }
    });

    updateBotLanguage(); // Sincroniza el Bot inmediatamente
});

// 3. LÓGICA DEL P&G BOT
const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat');
const typingIndicator = document.getElementById('typing-indicator');

const botResponses = {
    free: {
        es: "Nuestra **Automatización Gratis** consiste en identificar un proceso repetitivo y automatizarlo en 1-2 semanas para que compruebes el ahorro real.",
        en: "Our **Free Automation** consists of identifying a repetitive process and automating it in 1-2 weeks so you can see the real savings."
    },
    price: {
        es: "Nuestros packs Pro comienzan en **USD 300/mes** e incluyen mantenimiento y soporte prioritario para múltiples procesos.",
        en: "Our Pro packs start at **USD 300/mo** and include maintenance and priority support for multiple processes."
    },
    tech: {
        es: "Expertos en **IA (GPT-4o)**, **n8n**, **Python** y soluciones **Cloud Native** de alta escala.",
        en: "Experts in **AI (GPT-4o)**, **n8n**, **Python**, and high-scale **Cloud Native** solutions."
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
        <button class="chat-opt-btn" data-action="human">${currentLang === 'es' ? '👤 Hablar con un Consultor' : '👤 Talk to a Consultant'}</button>
    `;
    chatBody.appendChild(menuDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

chatTrigger.addEventListener('click', () => {
    const isFlex = chatWindow.style.display === 'flex';
    chatWindow.style.display = isFlex ? 'none' : 'flex';
});

document.getElementById('close-chat').addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    msg.innerHTML = formattedText;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(action) {
    typingIndicator.style.display = 'flex';
    chatBody.scrollTop = chatBody.scrollHeight;

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

sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim().toLowerCase();
    if (text) {
        addMessage(chatInput.value, 'user');
        chatInput.value = '';
        
        if (text.includes('gratis') || text.includes('free')) botReply('free');
        else if (text.includes('precio') || text.includes('cost') || text.includes('pack')) botReply('price');
        else if (text.includes('consultor') || text.includes('hablar') || text.includes('seller')) botReply('human');
        else {
            typingIndicator.style.display = 'flex';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage(currentLang === 'es' ? "Entiendo. Un especialista revisará tu duda. Aquí tienes mis opciones:" : "I understand. A specialist will review your question. Here are my options:", 'bot');
                showChatMenu();
            }, 1200);
        }
    }
});

chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendBtn.click(); });

function updateBotLanguage() {
    chatInput.placeholder = chatInput.getAttribute(`data-${currentLang}-placeholder`);
    const existingMenu = document.querySelector('.chat-options');
    if (existingMenu) {
        existingMenu.remove();
        showChatMenu();
    }
    const firstBotMsg = chatBody.querySelector('.message.bot');
    if (firstBotMsg && firstBotMsg.hasAttribute(`data-${currentLang}`)) {
        firstBotMsg.innerHTML = firstBotMsg.getAttribute(`data-${currentLang}`);
    }
}

// 4. ANIMACIONES Y CARGA
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

window.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
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
