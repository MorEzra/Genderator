import { Query, Resolver, Arg } from "type-graphql"
import { Person } from "./schema"

const { getAllNames, getDataByName, setNewNameRecord } = require("../controllers/persons-controller");

// const getPersonsByName = (name: string): Person | void => {
// }

@Resolver(() => Person)
export class PersonsResolver {
    @Query(() => [Person])
    async getNames(): Promise<Person[]> {
        return getAllNames();
    }

    @Query(() => Person)
    async getDataByName(@Arg("name") name: string): Promise<Person> {
        let person: Promise<Person> = await getDataByName(name);
        await setNewNameRecord(person);
        return person;
    }
}