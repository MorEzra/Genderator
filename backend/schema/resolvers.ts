import { Query, Resolver, Arg, Mutation } from "type-graphql"
import { Person } from "./schema"

const { getAllNames, getDataByName } = require("../controllers/persons-controller");

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
        return getDataByName(name);
    }

    // @Mutation(() => Person)
    // async createNameRecord(@Arg("input") input: Person): Promise<User> {
    //     const user = {
    //         id: this.users.length + 1,
    //         ...input,
    //     }
        
    //     this.users.push(user)
    //     return user
    // }

    // @Mutation(() => User)
    // async updateUser(
    //     @Arg("id") id: number,
    //     @Arg("input") input: UserInput
    // ): Promise<User> {
    //     const user = this.users.find(u => u.id === id)
        
    //     if (!user) {
    //         throw new Error("User not found")
    //     }

    //     const updatedUser = {
    //         ...user,
    //         ...input,
    //     }

    //     this.users = this.users.map(u => (u.id === id ? updatedUser : u))

    //     return updatedUser
    // }
}