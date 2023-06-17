import express from "express";
import morgan from "morgan";
//Routes
import personasRoutes from "./routes/persona.routes";

const app = express();

//Settings
app.set("port",4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use(personasRoutes);

export default app;