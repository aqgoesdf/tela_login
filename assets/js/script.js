document.addEventListener('DOMContentLoaded', () => {
    // 1. Alternar visibilidade da senha (Login / Cadastro)
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'text') {
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }

    // 2. Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');

            let isValid = true;

            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-rose-500');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-rose-500');
            }

            if (passwordInput.value.length < 6) {
                passwordError.classList.remove('hidden');
                passwordInput.classList.add('border-rose-500');
                isValid = false;
            } else {
                passwordError.classList.add('hidden');
                passwordInput.classList.remove('border-rose-500');
            }

            if (!isValid) return;

            submitBtn.disabled = true;
            btnText.textContent = 'Entrando...';
            btnSpinner.classList.remove('hidden');

            setTimeout(() => {
                // Redireciona para o painel administrativo simulando sucesso
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // 3. Formulário de Cadastro
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const termsInput = document.getElementById('terms');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const termsError = document.getElementById('termsError');
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');

            let isValid = true;

            if (!nameInput.value.trim()) {
                nameError.classList.remove('hidden');
                nameInput.classList.add('border-rose-500');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
                nameInput.classList.remove('border-rose-500');
            }

            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-rose-500');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-rose-500');
            }

            if (passwordInput && passwordInput.value.length < 6) {
                passwordError.classList.remove('hidden');
                passwordInput.classList.add('border-rose-500');
                isValid = false;
            } else if (passwordError) {
                passwordError.classList.add('hidden');
                if (passwordInput) passwordInput.classList.remove('border-rose-500');
            }

            if (!termsInput.checked) {
                termsError.classList.remove('hidden');
                isValid = false;
            } else {
                termsError.classList.add('hidden');
            }

            if (!isValid) return;

            submitBtn.disabled = true;
            btnText.textContent = 'Criando conta...';
            btnSpinner.classList.remove('hidden');

            setTimeout(() => {
                alert('Conta criada com sucesso! Redirecionando para o login...');
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // 4. Formulário de Recuperação de Senha
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            const successMessage = document.getElementById('successMessage');

            let isValid = true;

            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-rose-500');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-rose-500');
            }

            if (!isValid) return;

            submitBtn.disabled = true;
            btnText.textContent = 'Enviando...';
            btnSpinner.classList.remove('hidden');

            setTimeout(() => {
                forgotForm.classList.add('hidden');
                if (successMessage) successMessage.classList.remove('hidden');
            }, 1500);
        });
    }

    // 5. Menu Dropdown Estilo Google no Dashboard
    const profileMenuBtn = document.getElementById('profileMenuBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileMenuBtn && profileDropdown) {
        profileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        window.addEventListener('click', (e) => {
            if (!profileMenuBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
});

// Função global para alternar as abas no Dashboard
function switchView(viewId) {
    const views = document.querySelectorAll('.content-view');
    views.forEach(view => view.classList.add('hidden'));

    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.classList.remove('hidden');
    }

    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        'all-posts': 'Todos os posts',
        'create-post': 'Criar novo post',
        'trash-posts': 'Posts excluídos (Lixeira)'
    };
    if (pageTitle) {
        pageTitle.textContent = titles[viewId] || 'Painel';
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === viewId) {
            btn.classList.add('bg-slate-700/70', 'text-white');
        } else {
            btn.classList.remove('bg-slate-700/70', 'text-white');
        }
    });
}