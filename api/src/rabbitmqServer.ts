import { Connection, Channel, connect, Message } from 'amqplib'

import ConsumerCliente from './rabbitmq/consumer/ConsumerClientes'
import ConsumerGastos from './rabbitmq/consumer/ConsumerGastos'

export default class RabbitmqServer {
    private connection: Connection
    private channel: Channel

    async start(): Promise<void> {
        this.connection = await connect(process.env.RABBIT_URI)
        this.channel = await this.connection.createChannel()
    }

    async publishInQueue(queue: string, message: string) {
        return this.channel.sendToQueue(queue, Buffer.from(message));
    }

    async consume(queue: string, callback: (message: Message) => void) {
        return this.channel.consume(queue, (message) => {
            callback(message);
            this.channel.ack(message);
        });
    }

    async consumeAll() {
        try {
            await this.start()

            const consumerCliente = new ConsumerCliente()

            this.channel.consume('create_clientes', message => {
                consumerCliente.create(message.content.toString())
                this.channel.ack(message);
            })

            console.log('Consumindo create_clientes')

            this.channel.consume('update_clientes', message => {
                consumerCliente.update(message.content.toString())
                this.channel.ack(message);
            })

            console.log('Consumindo update_clientes')


            this.channel.consume('delete_clientes', message => {
                consumerCliente.destroy(message.content.toString())
                this.channel.ack(message)
            })

            console.log('Consumindo delete_clientes')

            const consumerGastos = new ConsumerGastos()

            this.channel.consume('create_gastos', message => {
                consumerGastos.create(message.content.toString())
                this.channel.ack(message)
            })

            console.log('Consumindo create_gastos')

            this.channel.consume('update_gastos', message => {
                consumerGastos.update(message.content.toString())
                this.channel.ack(message)
            })

            console.log('Consumindo update_gastos')

            this.channel.consume('delete_gastos', message => {
                consumerGastos.destroy(message.content.toString())
                this.channel.ack(message)
            })

            console.log('Consumindo delete_gastos')


        } catch (err) {
            console.log(err)
            throw new Error(err);
        }
    }
}
