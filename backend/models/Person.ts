export type Person = {
    name?: string,
    details?: Details[] | any
};

export type Details = {
    gender?: string,
    nationality?: string,
    probability?: string
}