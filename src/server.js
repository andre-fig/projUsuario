require('dotenv').config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";

let app = express();

// Usa o analisador de cookies
app.use(cookieParser('secret'));

// Sessão de configurações
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Habilita o body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
configViewEngine(app);

// Ativa as mensagens flash
app.use(connectFlash());

// Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Inicializa todas as rotas
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));

