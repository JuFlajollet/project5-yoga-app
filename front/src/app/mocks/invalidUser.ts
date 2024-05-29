import { User } from '../interfaces/user.interface';

export const invalidUser: User = {
    id: 1,
    email: 'toto',
    lastName: 'to',
    firstName: 'to',
    admin: false,
    password: 'to',
    createdAt: new Date()
}