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
             // Validação do Email
            if (emailInput.value.trim() === '') {
                isValid = false;
                feedbackMessages.push('O campo Email é obrigatório.');
                emailInput.classList.add('error');
            } else if (!isValidEmail(emailInput.value.trim())) {
                isValid = false;
                feedbackMessages.push('Por favor, insira um email válido.');
                emailInput.classList.add('error');
            }

            // Validação da Mensagem
            if (messageInput.value.trim() === '') {
                isValid = false;
                feedbackMessages.push('O campo Mensagem é obrigatório.');
                messageInput.classList.add('error');
            }

            // Exibe o feedback
            formFeedback.className = 'form-feedback'; 
            if (isValid) {
                formFeedback.textContent = 'Mensagem enviada com sucesso!';
                formFeedback.classList.add('success');
                contactForm.reset(); 
            } else {
                formFeedback.innerHTML = feedbackMessages.join('<br>');
                formFeedback.classList.add('error');
            }
            formFeedback.style.display = 'block';
        });
    }
