import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClientesRepository } from '../repositories/ClientesRepository'

class ClientesController {

    async filter(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)
        try {
            const { id, startDate, endDate } = req.params

            if (!id || !startDate || !endDate) {
                return res.status(400).json("Argumentos de busca não encontrados");
            }

            const clienteExists = await clienteRepository.findOne(id)

            if (!clienteExists) {
                return res.status(404).json("Cliente não encontrado");
            }

            const initialDate = new Date(startDate + "T00:00:00")
            const finalDate = new Date(endDate + "T00:00:00")

            if (initialDate > finalDate) {
                return res.status(400).json("A data final deve ser maior que a data inicial")
            }

            const cliente = await clienteRepository.createQueryBuilder("cliente")
                .innerJoinAndSelect("cliente.gastos", "gasto")
                .where(`cliente.id = ${id} AND gasto.data BETWEEN '${startDate}T00:00:00' AND '${endDate}T23:59:59'`)
                .getOne()

            if (cliente) {
                return res.status(200).json(cliente)
            } else {
                return res.status(200).json("Nenhum gasto registrado entre as datas informadas")
            }

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async results(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)
        try {
            const { id, mes, ano } = req.params

            if (!id || !mes || !ano) {
                return res.status(400).json("Argumentos de busca não encontrados");
            }

            const cliente = await clienteRepository.findOne(id, { relations: ["gastos"] })

            if (!cliente) {
                return res.status(404).json("Cliente não encontrado")
            }

            let total = 0
            let totalMes = 0
            for (const gasto of cliente.gastos) {
                if (Number(mes) == gasto.created_at.getMonth() + 1 && Number(ano) == gasto.created_at.getFullYear()) {
                    totalMes += Number(gasto.valor)
                }
                total += Number(gasto.valor)
            }

            return res.status(200).json({
                total,
                totalMes,
                mediaDiaria: (totalMes / new Date(Number(ano), Number(mes), 0).getDate()).toFixed(2),
                cliente
            })

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async index(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)
        try {
            const clientes = await clienteRepository.find({ relations: ["gastos"] })

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
                return res.status(400).json("Cliente não encontrado");
            }

            const cliente = await clienteRepository.findOne(id, { relations: ["gastos"] })

            return res.status(200).json(cliente)

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

    async create(req: Request, res: Response) {
        const clienteRepository = getCustomRepository(ClientesRepository)

        try {
            const { empresa, nome, telefone, email } = req.body

            const userAlreadyExists = await clienteRepository.findOne({ email })
            if (userAlreadyExists) {
                return res.status(400).json("E-mail já utilizado");
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
        const clienteRepository = getCustomRepository(ClientesRepository)

        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json("Informe o id do cliente para atualizar");
            }

            const clienteExists = await clienteRepository.findOne(id)

            if (!clienteExists) {
                return res.status(404).json("Cliente não encontrado");
            }

            const { empresa, nome, telefone, email } = req.body

            if (email) {
                const emailExists = await clienteRepository.findOne({ email })

                if (emailExists && emailExists.id != Number(id)) {
                    return res.status(400).json("E-mail já utilizado");
                }
            }

            const cliente = await clienteRepository.update(id, {
                empresa: empresa || clienteExists.empresa,
                nome: nome || clienteExists.nome,
                telefone: telefone || clienteExists.telefone,
                email: email || clienteExists.email
            })

            if (cliente.affected == 1) {
                const clienteUpdated = await clienteRepository.findOne(id)

                return res.status(200).json(clienteUpdated)
            } else {
                return res.status(400).json('Operação não afetou nenhum registro')
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
                return res.status(400).json("Informe o id do cliente para excluir");
            }

            const userExists = await clienteRepository.findOne(id)
            if (!userExists) {
                return res.status(404).json("Cliente não encontrado");
            }

            const cliente = await clienteRepository.delete(id)

            if (cliente.affected == 1) {
                return res.status(200).json({ message: "Cliente excluído" })
            } else {
                return res.status(400).json('Operação não afetou nenhum registro')
            }

        } catch (err) {
            return res.status(400).json(err.toString())
        }
    }

}

export { ClientesController }