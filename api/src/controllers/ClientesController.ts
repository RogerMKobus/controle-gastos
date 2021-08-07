import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClientesRepository } from '../repositories/ClientesRepository'

class ClientesController {

    async index(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)
        try {
            const clientes = await clienteRepository.find()

            return res.status(200).json(clientes)

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async find(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)
        try {
            const { id } = req.params

            if (!id) {
                throw new Error("User not found");
            }

            const cliente = await clienteRepository.findOne(id)

            return res.status(200).json(cliente)

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async create(req: Request, res: Response) {
        const { empresa, nome, telefone, email } = req.body

        const clienteRepository = getCustomRepository(ClientesRepository)

        try {
            const userAlreadyExists = await clienteRepository.findOne({ email })

            if (userAlreadyExists) {
                throw new Error("User already exists!");
            }

            const cliente = clienteRepository.create({
                empresa,
                nome,
                telefone,
                email
            })

            await clienteRepository.save(cliente)

            return res.status(201).json(cliente)
        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async update(req: Request, res: Response) {
        const { empresa, nome, telefone, email } = req.body

        const clienteRepository = getCustomRepository(ClientesRepository)

        try {
            const { id } = req.params

            if (!id) {
                throw new Error("User not found");
            }

            if (email) {
                const userAlreadyExists = await clienteRepository.findOne({ email })

                if (userAlreadyExists && userAlreadyExists.id != Number(id)) {
                    throw new Error("User already exists!");
                }

                const cliente = await clienteRepository.update(id, {
                    empresa,
                    nome,
                    telefone,
                    email
                })

                if (cliente.affected == 1) {
                    const clienteUpdated = await clienteRepository.findOne(id)

                    return res.status(200).json(clienteUpdated)
                } else {
                    return res.status(400).json('Update did not affect any row')
                }
            }
        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async destroy(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)

        try {
            const { id } = req.params

            if (!id) {
                throw new Error("User not found");
            }

            const cliente = await clienteRepository.delete(id)

            if (cliente.affected == 1) {
                return res.status(200).json({ message: "User deleted" })
            } else {
                return res.status(400).json('Delete did not affect any row')
            }

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

}

export { ClientesController }