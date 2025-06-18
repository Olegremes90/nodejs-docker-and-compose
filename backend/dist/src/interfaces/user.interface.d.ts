import { Request as ExpressRequest } from 'express';
interface User {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    about?: string;
    avatar?: string;
}
export interface CustomRequest extends ExpressRequest {
    user: User;
}
export {};
