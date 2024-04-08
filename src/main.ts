import App from "./app/app";
import dotenv from 'dotenv'; 

// Declare __dirname variable
declare const __dirname: string;

dotenv.config({path: (__dirname + "/config.env")}); 

const port: number = Number(process.env.PORT) || 3000;

const app = new App(port);
app.listen();
