import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { Clientes } from '../models/Clientes'

import { CreateClienteInput, UpdateClienteInput } from '../inputs/InputClientes'

@Resolver()
export class ClientesResolver {

    @Query(() => [Clientes])
    clientes() {
        return Clientes.find({ relations: ["gastos"] })
    }

    @Mutation(() => Clientes)
    async createCliente(@Arg("data") data: CreateClienteInput) {
        const cliente = Clientes.create(data)
        await cliente.save()
        return cliente
    }

    @Mutation(() => Clientes)
    async updateCliente(@Arg("id") id: number, @Arg("data") data: UpdateClienteInput) {
        const cliente = await Clientes.findOne(id)

        if(!cliente) {
            throw new Error("Cliente não encontrado");
        }

        if(data.email) {
            const emailExists = await Clientes.findOne({
                where: { email: data.email }
            })

            if(emailExists) {
                throw new Error("E-mail já cadastrado");
            }
        }

        Object.assign(cliente, data)

        await cliente.save()
        return cliente
    }

    @Mutation(() => String)
    async deleteCliente(@Arg("id") id: number) {
        const cliente = await Clientes.findOne(id)

        if(!cliente) {
            throw new Error("Cliente não encontrado");
        }

        await cliente.remove()

        return "Cliente removido"
    }

}