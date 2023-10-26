export type QueryReponse<QueryName extends string, T> = {
    data: {
        [key in QueryName]: T
    },
    errors?: {
        message: string
    }[]
}
