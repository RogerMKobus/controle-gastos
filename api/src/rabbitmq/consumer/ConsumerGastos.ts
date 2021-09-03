import { getCustomRepository } from "typeorm";
import { GastosRepository } from '../../repositories/GastosRepository'

export default class ConsumerGastos {

    async create(gasto: string) {
        try {
            const gastosRepository = getCustomRepository(GastosRepository)
            const { valor, cliente, data } = JSON.parse(gasto)

            const gastoCreated = gastosRepository.create({
                valor,
                cliente,
                data: data || new Date()
            })

            await gastosRepository.save(gastoCreated)

            console.log('Gasto criado: ')
            console.log(gastoCreated)

        } catch (err) {
            throw new Error(err);
        }
    }

    async update(gasto: string) {
        try {
            const gastosRepository = getCustomRepository(GastosRepository)

            const { id, valor, cliente, data } = JSON.parse(gasto)

            const gastoExist = await gastosRepository.findOne(id)

            if (cliente) {
                const updateGasto = await gastosRepository.update(id, {
                    valor: valor || gastoExist.valor,
                    cliente: cliente,
                    data: data || gastoExist.data
                })

                if (updateGasto.affected == 1) {
                    const gastoUpdated = await gastosRepository.findOne({
                        where: { id },
                        relations: ['cliente']
                    })

                    console.log('Gasto atualizado: ')
                    console.log(gastoUpdated)
                } else {
                    throw new Error("Operação não afetou nenhum registro");
                }

            } else {
                const updateGasto = await gastosRepository.update(id, {
                    valor: valor || gastoExist.valor,
                    data: data || gastoExist.data
                })

                if (updateGasto.affected == 1) {
                    const gastoUpdated = await gastosRepository.findOne({
                        where: { id },
                        relations: ['cliente']
                    })

                    console.log('Gasto atualizado: ')
                    console.log(gastoUpdated)
                } else {
                    throw new Error("Operação não afetou nenhum registro");
                }
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async destroy(id: string) {
        try {

            const gastoId = JSON.parse(id)

            const gastosRepository = getCustomRepository(GastosRepository)
            const gasto = await gastosRepository.delete(gastoId)

            if (gasto.affected == 1) {
                console.log(`Gasto ${id} excluído`)
            } else {
                throw new Error("Operação não afetou nenhum registro");
            }

        } catch (err) {
            throw new Error(err);
        }
    }

}