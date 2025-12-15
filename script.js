// ===============================
// ANIMAÇÃO LOGIN / CADASTRO
// ===============================
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// ===============================
// AUTENTICAÇÃO FIREBASE
// ===============================

// 🔥 Imports Firebase (SDK moderno)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjut1s0m_2fN5WUaQm6qCaIbHY22a4xrg",
    authDomain: "ewbaross.firebaseapp.com",
    projectId: "ewbaross",
    storageBucket: "ewbaross.firebasestorage.app",
    messagingSenderId: "959677459000",
    appId: "1:959677459000:web:02422f84df27b18bdf94cd"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// ===============================
// CADASTRO (EMAIL + SENHA)
// ===============================
window.cadastrar = async function (event) {
    event.preventDefault();

    const name = document.querySelector(".sign-up input[placeholder='Name']").value;
    const email = document.querySelector(".sign-up input[placeholder='Email']").value;
    const password = document.querySelector(".sign-up input[placeholder='Password']").value;

    if (!name || !email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
        window.location.href = "Fluxiainicio.html";
    } catch (error) {
        alert("Erro no cadastro: " + error.message);
    }
};


// ===============================
// LOGIN (EMAIL + SENHA)
// ===============================
window.logar = async function (event) {
    event.preventDefault();

    const email = document.querySelector(".sign-in input[placeholder='Email']").value;
    const password = document.querySelector(".sign-in input[placeholder='Password']").value;

    if (!email || !password) {
        alert("Preencha email e senha!");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado!");
        window.location.href = "Fluxiainicio.html";
    } catch (error) {
        alert("Erro ao logar: " + error.message);
    }
};


// ===============================
// LOGIN COM GOOGLE
// ===============================
window.loginGoogle = async function () {
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Bem-vindo, ${result.user.displayName}!`);
        window.location.href = "Fluxiainicio.html";
    } catch (error) {
        alert("Erro no Google: " + error.message);
    }
};


// ===============================
// USUÁRIO LOGADO?
// ===============================
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Se o Firebase detectar que o usuário já está logado:
        console.log("Usuário já autenticado: " + user.email);
        
        // Redireciona automaticamente para a página principal
        window.location.href = "Fluxiainicio.html"; 
    }
});
