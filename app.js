const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
// require('dotenv/config')

// Mongoose Configs
mongoose.connect(config.db_connection_string, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', error => console.log('connection error!' + error));
db.once('open', () => { console.log("we're connected") });

// Imported routes
const indexRoutes = require('./Routes/index');
const usersRoutes = require('./Routes/users');
const protectedRoutes = require('./Routes/protected');

// Middlewares Configurations
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/protected', protectedRoutes);


const PORT = config.port || 3000

app.listen(PORT,
    console.log('rodando na porta', PORT))