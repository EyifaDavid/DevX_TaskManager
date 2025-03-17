import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js"


dotenv.config()

dbConnection()

const PORT = process.env.PORT || 5000

const app = express();


app.use(
    cors({
    origin:["http://localhost:3000","http://localhost:3001","https://devx-taskmanager.netlify.app",],
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://devx-taskmanager.netlify.app"); // Allow only frontend
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies & auth
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Respond to preflight request
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT,() => console.log(`Server listening on ${PORT}`));
