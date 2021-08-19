import { Resolver, Query, Arg, ObjectType, Field } from "type-graphql"
import { Clientes } from "../models/Clientes"

@ObjectType()
class ResultadoMensal {
    @Field()
    cliente: Clientes;

    @Field()
    total: number;

    @Field()
    totalMes: number;

    @Field()
    mediaDiaria: number;
}

@Resolver()
export class ResultadosResolver {

    @Query(() => ResultadoMensal)
    async resultadoMensal(@Arg("id") id: number, @Arg("mes") mes: number, @Arg("ano") ano: number) {

        if (!id || !mes || !ano) {
            throw new Error("Argumentos de busca não encontrados");
        }

        const cliente = await Clientes.findOne(id, { relations: ["gastos"] })

        let total = 0
        let totalMes = 0
        for (const gasto of cliente.gastos) {
            if (Number(mes) == gasto.created_at.getMonth() + 1 && Number(ano) == gasto.created_at.getFullYear()) {
                totalMes += Number(gasto.valor)
            }
            total += Number(gasto.valor)
        }

        return {
            cliente,
            total,
            totalMes,
            mediaDiaria: (totalMes / new Date(Number(ano), Number(mes), 0).getDate()).toFixed(2)
        }
    }

    @Query(() => Clientes)
    async gastosByDate(@Arg("id") id: number, @Arg("startDate") startDate: string, @Arg("endDate") endDate: string) {

        if (!id || !startDate || !endDate) {
            throw new Error("Argumentos de busca não encontrados");
        }

        const clienteExists = await Clientes.findOne(id)

        if (!clienteExists) {
            throw new Error("Cliente não encontrado");
        }

        const initialDate = new Date(startDate + "T00:00:00")
        const finalDate = new Date(endDate + "T00:00:00")

        if (initialDate > finalDate) {
            throw new Error("A data final deve ser maior que a data inicial")
        }

        const cliente = Clientes.createQueryBuilder("cliente")
            .innerJoinAndSelect("cliente.gastos", "gasto")
            .where(`cliente.id = ${id} AND gasto.created_at BETWEEN '${startDate}T00:00:00' AND '${endDate}T23:59:59'`)
            .getOne()

        if (cliente) {
            return cliente
        } else {
            throw new Error("Nenhum gasto registrado entre as datas informadas")
        }
    }

}