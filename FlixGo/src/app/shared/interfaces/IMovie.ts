import { IGenre } from "./IGenre"

export interface IMovie {
    _id: string,
    title: string,
    genres: IGenre[],
    time: number,
    releaseYear: number,
    imgUrl: string,
    trailer: string,
    description: string,
    postCreator: string
    _creationDate: number
}
