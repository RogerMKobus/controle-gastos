import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { GastosRepository } from '../repositories/GastosRepository'
import { ClientesRepository } from '../repositories/ClientesRepository'

class GastosController {

    async index(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const gastos = await gastosRepository.find({ relations: ['cliente'] })

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
                return res.status(400).json("Informe o id para busca");
            }

            const gasto = await gastosRepository.findOne(id, { relations: ['cliente'] })

            return res.status(200).json(gasto)

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async create(req: Request, res: Response) {
        const gastosRepository = getCustomRepository(GastosRepository)
        try {
            const { valor, cliente, data } = req.body

            const clienteRepository = getCustomRepository(ClientesRepository)
            const clienteExists = await clienteRepository.findOne(cliente)
            if (!clienteExists) {
                return res.status(404).json("Cliente não encontrado");
            }

            const gasto = gastosRepository.create({
                valor,
                cliente,
                data: data || new Date()
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
                return res.status(400).json("Informe o id para atualizar");
            }

            const gastoExists = await gastosRepository.findOne(id, { relations: ['cliente'] })
            if (!gastoExists) {
                return res.status(404).json("Gasto não encontrado");
            }

            const { valor, cliente, data } = req.body

            if (cliente) {
                const clienteRepository = getCustomRepository(ClientesRepository)

                const clienteExists = await clienteRepository.findOne(cliente)
                if (!clienteExists) {
                    return res.status(404).json("Cliente não encontrado");
                }
            }

            const gasto = await gastosRepository.update(id, {
                valor: valor || gastoExists.valor,
                cliente: cliente || gastoExists.cliente?.id,
                data: data || gastoExists.data
            })

            if (gasto.affected == 1) {
                const gastoUpdated = await gastosRepository.findOne(id, { relations: ['cliente'] })

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
                return res.status(400).json("Informe o id para excluir");
            }

            const itemExists = await gastosRepository.findOne(id)
            if (!itemExists) {
                return res.status(404).json("Registro não encontrado");
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