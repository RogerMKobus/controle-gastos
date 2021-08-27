import { getCustomRepository } from "typeorm";
import { ClientesRepository } from '../../repositories/ClientesRepository'

export default class ConsumerCliente {

    async create(cliente: string) {
        try {
            const clienteRepository = getCustomRepository(ClientesRepository)
            const { empresa, nome, telefone, email } = JSON.parse(cliente)

            const clienteCreated = clienteRepository.create({
                empresa,
                nome,
                telefone,
                email
            })

            await clienteRepository.save(clienteCreated)

            console.log('cliente criado: ')
            console.log(clienteCreated)
        } catch (err) {
            throw new Error(err.toString());
        }
    }

    async update(cliente: string) {
        try {
            const { id, empresa, nome, telefone, email } = JSON.parse(cliente)

            const clienteRepository = getCustomRepository(ClientesRepository)
            const clienteExist = await clienteRepository.findOne(id)

            const updateCliente = await clienteRepository.update(id, {
                empresa: empresa || clienteExist.empresa,
                nome: nome || clienteExist.nome,
                telefone: telefone || clienteExist.telefone,
                email: email || clienteExist.email
            })

            if (updateCliente.affected == 1) {
                const clienteAtualizado = await clienteRepository.findOne(id)

                console.log('Cliente atualizado ')
                console.log(clienteAtualizado)
            } else {
                throw new Error("Operação não afetou nenhum registro");
            }

        } catch (err) {
            throw new Error(err);
        }
    }

    async destroy(id: string) {
        try {
            
            const clienteId = JSON.parse(id)

            const clienteRepository = getCustomRepository(ClientesRepository)
            const cliente = await clienteRepository.delete(clienteId)

            if (cliente.affected == 1) {
                console.log('Cliente excluído')
            } else {
                throw new Error("Operação não afetou nenhum registro");
            }

        } catch (err) {
            throw new Error(err);
        }
    }

}
