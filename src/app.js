import express from 'express';
import envsConfig from './config/envs.config.js';
import { connectMongoDB } from './config/nomgoDB.config.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from "./config/passport/passport.config.js";


const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.use(cookieParser());

app.use(passport.initialize());

app.use("/api", routes);

app.use((req, res) => {
    res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(envsConfig.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);

})