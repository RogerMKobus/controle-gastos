import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { Gastos } from '../models/Gastos'
import { Clientes } from "../models/Clientes"

import { CreateGastoInput, UpdateGastoInput } from '../inputs/InputGastos'

@Resolver()
export class GastosResolver {

    @Query(() => [Gastos])
    async gastos() {
        return await Gastos.find({ relations: ['cliente'] })
    }

    @Query(() => Gastos)
    async gasto(@Arg("id") id: number) {
        const gasto = await Gastos.findOne(id, { relations: ['cliente'] })

        if (!gasto) {
            throw new Error("Gasto não encontrado");
        }

        return gasto
    }

    @Mutation(() => Gastos)
    async createGasto(@Arg("data") data: CreateGastoInput) {
        const cliente = await Clientes.findOne(data.cliente)

        const dataWithCliente = {
            valor: data.valor,
            cliente
        }

        const gasto = Gastos.create(dataWithCliente)

        await gasto.save()
        return gasto
    }

    @Mutation(() => Gastos)
    async updateGasto(@Arg("id") id: number, @Arg("data") data: UpdateGastoInput) {
        const gasto = await Gastos.findOne(id)

        if (!gasto) {
            throw new Error("Gasto não encontrado");
        }

        if (data.cliente) {
            const cliente = await Clientes.findOne(data.cliente)

            const newData = {
                valor: data.valor ? data.valor : gasto.valor,
                cliente
            }

            Object.assign(gasto, newData)
            await gasto.save()
            return gasto

        } else {
            Object.assign(gasto, data)
            await gasto.save()
            return gasto
        }
    }

    @Mutation(() => String)
    async deleteGasto(@Arg("id") id: number) {
        const gasto = await Gastos.findOne(id)

        if (!gasto) {
            throw new Error("Gasto não encontrado");
        }

        await gasto.remove()

        return "Gasto removido"
    }
}
