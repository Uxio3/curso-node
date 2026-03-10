import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hbs from 'hbs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Para poder usar __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Para renderizar con handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) { console.log(err);});

// Middleware para servir fichero estáticos
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', {
    titulo: 'Curso de Node.js',
    nombre: 'Adrián Valdés'
  });
});

app.get('/generic', (req, res) => {
  res.render('generic', {
    titulo: 'Curso de Node.js',
    nombre: 'Adrián Valdés'
  })
});

app.get('/elements', (req, res) => {
  res.render('elements', {
    titulo: 'Curso de Node.js',
    nombre: 'Adrián Valdés'
  });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});