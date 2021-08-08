import { EntityRepository, Repository } from "typeorm";
import { Gastos } from '../models/Gastos'

@EntityRepository(Gastos)
class GastosRepository extends Repository<Gastos> {

}

export { GastosRepository }