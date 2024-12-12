import express from "express";
import authorController from "../controllers/authorController.js";


const router = express.Router();

router.post('/crearAutor', authorController.crearAutor);
router.get('/obtenerAutores', authorController.obtenerAutores);
router.get('/obtenerAutor/:id', authorController.obtenerAutorId);
router.put('/actualizarAutor/:id', authorController.actualizarAutor);
router.delete('/borrarAutor/:id', authorController.borrarUsuario);

export default router;