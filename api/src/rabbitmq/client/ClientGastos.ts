import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import RabbitmqServer from "../../rabbitmqServer";
import { ClientesRepository } from '../../repositories/ClientesRepository';
import { GastosRepository } from '../../repositories/GastosRepository';

const server = new RabbitmqServer();

export default class ClientGastos {

    async create(req: Request, res: Response) {
        try {
            const clienteRepository = getCustomRepository(ClientesRepository)

            const clienteExists = await clienteRepository.findOne({
                where: { id: req.body.cliente }
            })

            if (!clienteExists) {
                return res.status(404).json("Cliente não encontrado");
            }

            await server.start();
            await server.publishInQueue('create_gastos', JSON.stringify(req.body));

            return res.status(201).json('Enviado a fila create_gastos')
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const gastosRepository = getCustomRepository(GastosRepository)
            const { id, cliente } = req.body

            const gastoExist = await gastosRepository.findOne(id)

            if (!gastoExist) {
                return res.status(404).json("Gasto não encontrado")
            }

            if (cliente) {
                const clienteRepository = getCustomRepository(ClientesRepository)

                const clienteExist = await clienteRepository.findOne({
                    where: { id: cliente }
                })

                if (!clienteExist) {
                    return res.status(404).json("Cliente não encontrado")
                }
            }

            await server.start();
            await server.publishInQueue('update_gastos', JSON.stringify(req.body));

            return res.status(200).json('Enviado a fila update_gastos')
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.body

            if (!id) {
                return res.status(400).json('Informe o id do gasto para excluir')
            }

            const gastosRepository = getCustomRepository(GastosRepository)
            const gastoExist = await gastosRepository.findOne(id)

            if (!gastoExist) {
                return res.status(404).json("Gasto não encontrado")
            }

            await server.start();
            await server.publishInQueue('delete_gastos', JSON.stringify(id));

            return res.status(200).json('Enviado a fila delete_gastos')
        } catch (err) {
            throw new Error(err);
        }
    }

}