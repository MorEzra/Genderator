import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Person {
    @Field()
    name?: string
    @Field()
    gender?: string
    @Field()
    nationality?: string
    @Field()
    probability?: string
}