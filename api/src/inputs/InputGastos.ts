import { InputType, Field } from "type-graphql";

@InputType()
class CreateGastoInput {

    @Field()
    valor: number;

    @Field()
    cliente: number;

    @Field()
    data: Date;

}

@InputType()
class UpdateGastoInput {

    @Field({ nullable: true })
    valor?: number;

    @Field({ nullable: true })
    cliente?: number;

    @Field({ nullable: true })
    data?: Date;

}

export { CreateGastoInput, UpdateGastoInput }