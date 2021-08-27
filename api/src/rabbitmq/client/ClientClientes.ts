import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import RabbitmqServer from "../../rabbitmqServer";
import { ClientesRepository } from '../../repositories/ClientesRepository';

const server = new RabbitmqServer();

export default class ClientClientes {

    async create(req: Request, res: Response) {
        try {
            const { email } = req.body

            const clienteRepository = getCustomRepository(ClientesRepository)
            const userAlreadyExists = await clienteRepository.findOne({ email })
            if (userAlreadyExists) {
                return res.status(400).json("E-mail já utilizado")
            }

            await server.start();
            await server.publishInQueue('create_clientes', JSON.stringify(req.body));

            return res.status(200).json('Enviado a fila create_clientes')
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id, email } = req.body

            if (!id) {
                return res.status(400).json("Informe o id do cliente para atualizar")
            }

            const clienteRepository = getCustomRepository(ClientesRepository)
            const clienteExist = await clienteRepository.findOne(id)

            if (!clienteExist) {
                return res.status(404).json("Cliente não encontrado")
            }

            if (email) {
                const emailExists = await clienteRepository.findOne({
                    where: { email }
                })

                if (emailExists && emailExists.id != Number(id)) {
                    return res.status(400).json("E-mail já utilizado");
                }
            }

            await server.start();
            await server.publishInQueue('update_clientes', JSON.stringify(req.body));

            return res.status(200).json('Enviado a fila update_clientes')
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(req: Request, res: Response) {
        try {

            const { id } = req.body

            if (!id) {
                return res.status(400).json("Informe o id do cliente para atualizar");
            }

            const clienteRepository = getCustomRepository(ClientesRepository)

            const clienteExists = await clienteRepository.findOne(id)
            if (!clienteExists) {
                return res.status(404).json("Cliente não encontrado")
            }

            await server.start();
            await server.publishInQueue('delete_clientes', JSON.stringify(id));

            return res.status(200).json('Enviado a fila delete_clientes')
        } catch (err) {
            throw new Error(err);
        }
    }
}