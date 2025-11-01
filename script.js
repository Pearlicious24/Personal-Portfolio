const PHRASES = ["UI/UX Designer", "Mobile App Developer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterStarted = false;


 window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 2000); 
  }
});
/**   
   @param {string} pageId 
 */
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        selectedPage.classList.add('active');
    }

    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.querySelector(`.nav-button[data-page="${pageId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    if (pageId === 'skills') {
        animateSkillBars();
    }
}

function typewriterEffect() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const currentPhrase = PHRASES[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) {
        typeSpeed = 50; 
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        typeSpeed = 500;
    }

    setTimeout(typewriterEffect, typeSpeed);
}

function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const knowledge = bar.getAttribute('data-knowledge');
        setTimeout(() => {
            bar.style.width = `${knowledge}%`;
        }, 100);
    });
}

/**
  @param {string} tabId 
 */
function switchSkillTab(tabId) {
    const graphicContent = document.getElementById('graphic-content');
    const devContent = document.getElementById('dev-content');
    const tabGraphic = document.getElementById('tab-graphic');
    const tabDev = document.getElementById('tab-dev');

    const accentCyan = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan');

    const setActiveTab = (activeTab, inactiveTab, activeContent, inactiveContent) => {
        activeTab.style.borderColor = accentCyan;
        activeTab.style.color = accentCyan;
        activeTab.classList.add('active-tab');
        
        inactiveTab.style.borderColor = 'transparent';
        inactiveTab.style.color = 'var(--text-primary)';
        inactiveTab.classList.remove('active-tab');

        activeContent.classList.remove('hidden');
        inactiveContent.classList.add('hidden');
    };

    if (tabId === 'graphic') {
        setActiveTab(tabGraphic, tabDev, graphicContent, devContent);
    } else if (tabId === 'dev') {
        setActiveTab(tabDev, tabGraphic, devContent, graphicContent);
    }
}

/**
 * @param {Event} e 
 */
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form['name'].value;
    const email = form['email'].value;
    const message = form['message'].value;
    const outputElement = document.getElementById('code-output');
    
    outputElement.textContent = `
// Contact Message Received:
const contactMessage = {
    name: "${name}",
    email: "${email}",
    message: "${message.substring(0, 50)}..." // Preview snippet
};`;

    alert(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
}

function updateLivePreview() {
    const name = document.getElementById('contact-name')?.value || "";
    const email = document.getElementById('contact-email')?.value || "";
    const message = document.getElementById('contact-message')?.value || "";
    const outputElement = document.getElementById('code-output');

    outputElement.textContent = `
// Live Preview Code:
const contactMessage = {
    name: "${name}",
    email: "${email}",
    message: "${message.substring(0, 50)}..."
};`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    const initialTabButton = document.getElementById('tab-graphic');
    if (initialTabButton) {
        const accentCyan = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan');
        initialTabButton.style.borderColor = accentCyan;
        initialTabButton.style.color = accentCyan;
    }
    
    if (!typewriterStarted) {
        typewriterEffect();
        typewriterStarted = true;
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateLivePreview);
        });
    }
    
    if (document.getElementById('skills').classList.contains('active')) {
        animateSkillBars();
    }

});
