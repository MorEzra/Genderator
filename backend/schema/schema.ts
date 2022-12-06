import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Person {
    @Field()
    name?: string
    @Field(type => [Details])
    details?: Details[]
}

@ObjectType()
export class Details {
    @Field()
    gender?: string
    @Field()
    nationality?: string
    @Field()
    probability?: string
}