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
// --- Quiz Interativo ---
    const quizData = [
        { question: "Qual o principal problema que o AquaLink busca resolver?", options: ["Poluição da água", "Falta de saneamento básico", "Impacto devastador das enchentes", "Desperdício de água"], answer: "Impacto devastador das enchentes" },
        { question: "Qual tecnologia o AquaLink utiliza para monitoramento em tempo real?", options: ["Sensores de temperatura", "Sensores de nível de água com Arduino", "Câmeras de segurança", "Drones"], answer: "Sensores de nível de água com Arduino" },
        { question: "Com qual antecedência o AquaLink visa antecipar enchentes?", options: ["1 hora", "24 horas", "Até 48h", "1 semana"], answer: "Até 48h" },
        { question: "Qual o percentual de redução de danos humanos e econômicos que o AquaLink pretende alcançar?", options: ["30%", "50%", "70%", "90%"], answer: "70%" },
        { question: "Para qual tipo de local o sistema AquaLink é ideal?", options: ["Grandes centros urbanos", "Locais com infraestrutura limitada", "Áreas rurais sem rios", "Montanhas"], answer: "Locais com infraestrutura limitada" },
        { question: "Quais são os principais benefícios do AquaLink?", options: ["Alto custo e difícil instalação", "Apenas monitoramento, sem alertas", "Fácil instalação, baixo custo e alta replicabilidade", "Depende de internet de alta velocidade"], answer: "Fácil instalação, baixo custo e alta replicabilidade" },
        { question: "Como a comunicação com a população ocorre via AquaLink?", options: ["Por telefone fixo", "Via rádio amador", "Via aplicativos com alertas em tempo real", "Por cartas"], answer: "Via aplicativos com alertas em tempo real" },
        { question: "Além dos aplicativos, quais outros alertas são acionados automaticamente pelo AquaLink?", options: ["Alarmes de carro", "Alertas visuais (LEDs) e sonoros (buzzer)", "Luzes de rua", "Sirenes de polícia"], answer: "Alertas visuais (LEDs) e sonoros (buzzer)" },
        { question: "O que o aplicativo AquaLink envia para os usuários em caso de risco?", options: ["Notícias do dia", "Rotas de fuga e alertas precisas", "Receitas culinárias", "Promoções de lojas"], answer: "Rotas de fuga e alertas precisas" },
        { question: "Qual o principal objetivo do AquaLink em relação à segurança dos usuários?", options: ["Apenas informar sobre o nível da água", "Emitir alertas imediatos para garantir a segurança de todos", "Prever o clima semanalmente", "Monitorar a qualidade da água"], answer: "Emitir alertas imediatos para garantir a segurança de todos" }
    ];

    let currentQuizQuestionIndex = 0;
    let userQuizAnswers = new Array(quizData.length).fill(null); 

    const quizContainer = document.getElementById('quiz-container');
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevQuizBtn = document.getElementById('prev-btn');
    const nextQuizBtn = document.getElementById('next-btn');
    const submitQuizBtn = document.getElementById('submit-btn');
    const resultElement = document.getElementById('result');

    if (quizContainer) {
        function loadQuizQuestion() {
            const question = quizData[currentQuizQuestionIndex];
            questionNumberElement.textContent = `Questão ${currentQuizQuestionIndex + 1} de ${quizData.length}`;
            questionTextElement.textContent = question.question;
            optionsContainer.innerHTML = ''; 

            question.options.forEach((option) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-button');
                button.addEventListener('click', () => selectQuizAnswer(option, button));
                // Marca a opção se já foi selecionada
                if (userQuizAnswers[currentQuizQuestionIndex] === option) {
                    button.classList.add('selected');
                }
                optionsContainer.appendChild(button);
            });
            updateQuizNavigationButtons();
        }

        function selectQuizAnswer(selectedOption, clickedButton) {
            optionsContainer.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
            clickedButton.classList.add('selected');
            userQuizAnswers[currentQuizQuestionIndex] = selectedOption;
        }

        function updateQuizNavigationButtons() {
            prevQuizBtn.disabled = currentQuizQuestionIndex === 0;
            nextQuizBtn.style.display = currentQuizQuestionIndex === quizData.length - 1 ? 'none' : 'inline-block';
            submitQuizBtn.style.display = currentQuizQuestionIndex === quizData.length - 1 ? 'inline-block' : 'none';
        }

        function submitQuiz() {
            let score = 0;
            quizData.forEach((question, index) => {
                if (userQuizAnswers[index] === question.answer) {
                    score++;
                }
            });

            resultElement.innerHTML = `<h4>Você acertou ${score} de ${quizData.length} questões!</h4>`;
            resultElement.style.display = 'block';

            // Esconde o quiz e mostra apenas o resultado
            [questionNumberElement, questionTextElement, optionsContainer, prevQuizBtn, nextQuizBtn, submitQuizBtn].forEach(el => el.style.display = 'none');
        }
        // Event listeners para navegação do quiz
        prevQuizBtn.addEventListener('click', () => {
            if (currentQuizQuestionIndex > 0) {
                currentQuizQuestionIndex--;
                loadQuizQuestion();
            }
        });
        nextQuizBtn.addEventListener('click', () => {
            if (currentQuizQuestionIndex < quizData.length - 1) {
                currentQuizQuestionIndex++;
                loadQuizQuestion();
            }
        });
        submitQuizBtn.addEventListener('click', submitQuiz);

        loadQuizQuestion(); // Carrega a primeira questão ao iniciar o quiz
    }

    // --- Personalização de Tema (Ícones no Menu de Navegação) ---
    const themeDots = document.querySelectorAll('.theme-dot');

    if (themeDots.length > 0) {
        function applyTheme(themeName) {
            body.className = ''; 
            body.classList.add(themeName + '-theme'); 
        }

        themeDots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                const selectedTheme = event.target.dataset.theme;
                applyTheme(selectedTheme);
                themeDots.forEach(d => d.classList.remove('selected'));
                event.target.classList.add('selected');
            });
        });

