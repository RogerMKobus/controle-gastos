import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { GastosRepository } from '../repositories/GastosRepository'
import { ClientesRepository } from '../repositories/ClientesRepository'

class GastosController {

    async index(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const gastos = await gastosRepository.find()

            return res.status(200).json(gastos)

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async find(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const { id } = req.params

            if (!id) {
                throw new Error("Informe o id para busca");
            }

            const gasto = await gastosRepository.findOne(id)

            return res.status(200).json(gasto)

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async create(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const { valor, cliente } = req.body

            const gasto = gastosRepository.create({
                valor,
                cliente
            })

            await gastosRepository.save(gasto)

            return res.status(201).json(gasto)
        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async update(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const { id } = req.params
            if (!id) {
                throw new Error("Informe o id para atualizar");
            }

            const itemExists = await gastosRepository.findOne(id)
            if (!itemExists) {
                throw new Error("Registro não encontrado");
            }

            const { valor, cliente } = req.body

            if (cliente) {
                const clienteRepository = getCustomRepository(ClientesRepository)

                const clienteExists = await clienteRepository.findOne(cliente)
                if(!clienteExists){
                    throw new Error("Cliente não encontrado");
                }
            }

            const gasto = await gastosRepository.update(id, {
                valor
            })

            if (gasto.affected == 1) {
                const gastoUpdated = await gastosRepository.findOne(id)

                return res.status(200).json(gastoUpdated)
            } else {
                return res.status(400).json('Operação não afetou nenhum registro')
            }
        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async destroy(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const { id } = req.params
            if (!id) {
                throw new Error("Informe o id para excluir");
            }

            const itemExists = await gastosRepository.findOne(id)
            if (!itemExists) {
                throw new Error("Registro não encontrado");
            }

            const gasto = await gastosRepository.delete(id)

            if (gasto.affected == 1) {
                return res.status(200).json({ message: "Registro excluído" })
            } else {
                return res.status(400).json('Operação não afetou nenhum registro')
            }

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

}

export { GastosController }