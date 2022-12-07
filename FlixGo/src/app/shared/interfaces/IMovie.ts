import { IGenre } from "./IGenre"

export interface IMovie {
    _id: String,
    title: String,
    genres: IGenre[],
    time: Number,
    releaseYear: Number,
    imgUrl: String,
    trailer: String,
    description: String,
    postCreator: String
    _creationDate: Number
}
