import express from "express";
import cors from "cors";
import userRoutes from "../src/routes/authorRoutes.js";
import userRoutesLibros from "../src/routes/librosRoutes.js";


const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', userRoutesLibros);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});