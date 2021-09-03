import "reflect-metadata"
import express from "express"
import { createConnection } from 'typeorm'
import { router } from "./routes"
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
require('dotenv').config()

import { GastosResolver } from './resolvers/GastosResolver'
import { ClientesResolver } from './resolvers/ClientesResolver'
import { ResultadosResolver } from "./resolvers/ResultadosResolver";
import RabbitmqServer from "./rabbitmqServer";

const app = express()
createConnection()
app.use(express.json())

app.use(router)

const rabbitmqServer = new RabbitmqServer()

rabbitmqServer.consumeAll()

async function startApollo() {
    const schema = await buildSchema({ resolvers: [GastosResolver, ClientesResolver, ResultadosResolver] });

    const server = new ApolloServer({ schema })

    await server.listen(process.env.APOLLO_PORT)
    console.log(`Apollo server => ${process.env.APOLLO_PORT}`)
}

startApollo()

export { app }