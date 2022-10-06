import express from "express";
import consola, { Consola } from "consola";
import cors from "cors";
import * as bodyParser from "body-parser";
import { urlencoded } from "body-parser";
import * as dotenv from "dotenv"

export class Server {
    public app: express.Application;
    public logger: Consola = consola;

    public constructor() {
        this.app = express();
    }

    public start() {
        this.setConfig();
        this.setRoutes();
        this.setRequestLogger();
        this.app.listen(process.env.PORT, () => {
            this.logger.success(`Server started on port ${process.env.PORT}`)
        })
    }

    private setConfig() {
        this.app.use(bodyParser.json());
        this.app.use(urlencoded({ extended: true}));
        this.app.use(cors());

        dotenv.config();
        
    }

    private setRequestLogger() {
        this.app.use(((req, res , next) => {
            console.log(`${req.method} - ${req.path}`);
        }))
    }

    private setRoutes() {
        this.app.get("/", ((req, res) => {
            res.json({ success: true, message: "JWT Authentication"})
        }))
    }
    
}

