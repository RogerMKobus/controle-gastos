import { Router } from 'express';
import { ClientesController } from './controllers/ClientesController'
import { GastosController } from './controllers/GastosController'

import ClientClientes from './rabbitmq/client/ClientClientes';
import ClientGastos from './rabbitmq/client/ClientGastos';

const router = Router();

const clientesController = new ClientesController()
const gastosController = new GastosController()
const clientCliente = new ClientClientes()
const clientGastos = new ClientGastos()

router.get("/clientes/filter/:startDate/:endDate/:id", clientesController.filter)
router.get("/clientes/results/:mes/:ano/:id", clientesController.results)
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

router.post("/rabbit/clientes", clientCliente.create)
router.put("/rabbit/clientes", clientCliente.update)
router.delete("/rabbit/clientes", clientCliente.delete)

router.post("/rabbit/gastos", clientGastos.create)
router.put("/rabbit/gastos", clientGastos.update)
router.delete("/rabbit/gastos", clientGastos.delete)

export { router };