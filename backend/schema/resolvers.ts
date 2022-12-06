import { Query, Resolver, Arg } from "type-graphql"
import { Person } from "./schema"

const { getAllNames, getDataByName } = require("../controllers/persons-controller");

// const getPersonsByName = (name: string): Person | void => {
// }

@Resolver(() => Person)
export class PersonsResolver {
    // private persons: Person[] = [
    //     { name: "John Doe", gender: "f", nationality: 'IL', probability: '0.12' },
    //     { name: "John Doe", gender: "f", nationality: 'IL', probability: '0.13' },
    // ]

    @Query(() => [Person])
    async getNames(): Promise<Person[]> {
        return getAllNames();
    }

    @Query(() => Person)
    async getDataByName(@Arg("name") name: string): Promise<Person> {
        return getDataByName(name);
    }
}