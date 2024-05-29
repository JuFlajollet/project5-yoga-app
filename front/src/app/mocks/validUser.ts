import { User } from '../interfaces/user.interface';

export const validUser: User = {
    id: 1,
    email: 'toto3@toto.com',
    lastName: 'toto',
    firstName: 'toto',
    admin: true,
    password: 'test!1234',
    createdAt: new Date()
}