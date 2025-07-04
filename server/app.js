import express from 'express';
import bodyParser from 'body-parser'; // necesario para leer POST
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // para servir HTML y CSS

// Página principal luego de iniciar sesión
app.get('/home', (req, res) => {
  res.send('<h1>Bienvenido a la página principal</h1>');
});

// Login POST
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 🛡️ Lógica básica de autenticación (deberías usar DB real aquí)
  if (email === 'alumno@ejemplo.com' && password === '1234') {
    // Login exitoso → redireccionar a home
    res.redirect('/home');
  } else {
    // Login fallido → mensaje
    res.send('<h3>Credenciales incorrectas</h3><a href="/">Volver</a>');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
