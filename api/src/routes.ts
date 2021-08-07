import { Router } from 'express';
import { ClientesController } from './controllers/ClientesController'

const router = Router();

const clientesController = new ClientesController();

router.post("/clientes", clientesController.create);
router.get("/clientes", clientesController.index);
router.get("/clientes/:id", clientesController.find);
router.put("/clientes/:id", clientesController.update);
router.delete("/clientes/:id", clientesController.destroy);

export { router };