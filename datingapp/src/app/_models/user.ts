import { Photo } from './photo';

export interface User {
    // id: number;
    // username: string;
    // knownAs: string;
    // age: number;
    // gender: string;
    // created: Date;
    // lastActive: Date;
    // photoUrl: string;
    // city: string;
    // country: string;
    // interests?: string;
    // lookingFor?: string;
    // photos?: Photo[];
    // introduction?: string;
    Id: number;
    Username: string;
    Gender: string;
    Age: number;
    KnownAs: string;
    Created: Date;
    LastActive: Date;
    City: string;
    country: string;
    PhotoUrl: string;
    Introduction?: string;
    LookingFor?: string;
    Interest?: string;
    Photos: Photo[];
}
