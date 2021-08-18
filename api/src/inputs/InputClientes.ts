import { InputType, Field } from "type-graphql";

@InputType()
class CreateClienteInput {

    @Field()
    empresa: string;

    @Field()
    nome: string;

    @Field()
    telefone: string;

    @Field()
    email: string;
    
}

class UpdateClienteInput {

    @Field({ nullable: true })
    empresa?: string;

    @Field({ nullable: true })
    nome?: string;

    @Field({ nullable: true })
    telefone?: string;

    @Field({ nullable: true })
    email?: string;
    
}

export { CreateClienteInput, UpdateClienteInput }