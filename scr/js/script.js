    // --- Elementos Comuns do DOM ---
    const body = document.body;
    const mainNav = document.getElementById('main-nav');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelectorAll('#main-nav a');
    const contentSections = document.querySelectorAll('main section.content-section');

    // ---  Validação de Formulário ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;
            let feedbackMessages = [];
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('error'));
            formFeedback.style.display = 'none';
            formFeedback.textContent = '';

            // Validação do Nome
            if (nameInput.value.trim() === '') {
                isValid = false;
                feedbackMessages.push('O campo Nome é obrigatório.');
                nameInput.classList.add('error');
            }
