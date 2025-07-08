
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Usuarios simulados
const usuarios = [
  { usuario: "Laura Acosta", password: "password1" },
  { usuario: "Juan Pérez", password: "1234" },
];

// Documentos simulados
const documentos = [
  { title: 'Asistencia y Faltas', description: 'Seguimiento de asistencias', file: 'docs/asistencia.pdf' },
  { title: 'Libreta Virtual', description: 'Calificaciones del alumno', file: 'docs/libreta.pdf' },
  { title: 'Plan de Estudios 2024', description: 'Objetivos del año escolar', file: 'docs/plan_estudios.pdf' },
  { title: 'Normas de Convivencia', description: 'Reglamento institucional', file: 'docs/normas.pdf' },
];

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const user = usuarios.find(u => u.usuario === username && u.password === password);

    if (user) {
      localStorage.setItem("usuario", user.usuario);
      window.location.href = "perfil.html";
    } else {
      document.getElementById("error").textContent = "Usuario o contraseña incorrectos";
    }
  });
}

// Perfil y documentos

  const input = document.getElementById("searchInput");
  const contenedor = document.getElementById("documentosContainer");

  function mostrarDocumentos(query = "") {
    contenedor.innerHTML = "";
    const filtrados = documentos.filter(doc =>
      doc.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filtrados.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron documentos.</p>";
      return;
    }

    filtrados.forEach(doc => {
      const card = document.createElement("div");
      card.className = "doc-card";
      card.innerHTML = `
        <h3>${doc.title}</h3>
        <p>${doc.description}</p>
        <a href="${doc.file}" target="_blank">Ver documento</a>
      `;
      contenedor.appendChild(card);
    });
  }

  input.addEventListener("input", () => {
    mostrarDocumentos(input.value);
  });

  mostrarDocumentos();
