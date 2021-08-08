import { Router } from 'express';
import { ClientesController } from './controllers/ClientesController'
import { GastosController } from './controllers/GastosController'

const router = Router();

const clientesController = new ClientesController()
const gastosController = new GastosController()

router.get("/clientes", clientesController.index)
router.get("/clientes/:id", clientesController.find)
router.post("/clientes", clientesController.create)
router.put("/clientes/:id", clientesController.update)
router.delete("/clientes/:id", clientesController.destroy)

router.get("/gastos", gastosController.index)
router.get("/gastos/:id", gastosController.find)
router.post("/gastos", gastosController.create)
router.put("/gastos/:id", gastosController.update)
router.delete("/gastos/:id", gastosController.destroy)

export { router };