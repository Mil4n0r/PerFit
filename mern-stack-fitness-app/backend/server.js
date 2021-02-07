const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const routes = require("./routes/routes");
const memberRoutes = require("./routes/member-routes");
const adminRoutes = require("./routes/admin-routes");
dotenv.config();

// Conexión con la base de datos
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
	console.log("Conexión con MongoDB establecida satisfactoriamente");
});

const PORT = process.env.PORT || 4000;

// Creación del middleware de Express

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));				// ???????????????????????????????????????????????????????????????????????????
app.use(express.json());		// Permite que express sea capaz de procesar las peticiones que tienen Content-Type: application/json
app.use(cookieParser());

// Inicialización de sesiones
// app.use(passport.initialize()); 
// app.use(passport.session());

require('./auth/auth');	// Importación de las estrategias de passport

// Agregación de rutas

app.use(routes);
app.use('/user',memberRoutes);
app.use('/admin',adminRoutes);

app.listen(PORT, () => {
	console.log("El servidor está funcionando en el puerto " + PORT);
});