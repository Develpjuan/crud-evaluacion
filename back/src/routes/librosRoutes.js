import express from 'express';
import libroController from '../controllers/libroController.js';

const router = express.Router();

router.post('/crearLibro', libroController.crearLibro);
router.get('/obtenerLibros', libroController.obtenerLibros);
router.get('/obtenerLibro/:id', libroController.obtenerLibroId);
router.put('/actualizarLibro/:id', libroController.actualizarLibro);
router.delete('/borrarLibro/:id', libroController.borrarLibro);

export default router;