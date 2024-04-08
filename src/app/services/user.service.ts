import { User } from '../../models/user';
import express, { Request, Response } from 'express';

class UserService {
    private users: User[] = [];

    createUser(username: string, email: string, password: string): User {
        const user: User = {
            username,
            email,
            password
        };

        // Save the user to the database
        this.users.push(user);

        return user;
    }

    authenticateUser(username: string, password: string): User | null {
        const user = this.users.find(u => u.username === username && u.password === password);

        return user || null;
    }
}
const router = express.Router();
const userService = new UserService();

router.post('/signup', (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = userService.createUser(username, '', password);

    (req.session as any).username = user.username;

    res.redirect('/homepage');
});

router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = userService.authenticateUser(username, password);

    if (user) {
        (req.session as any).username = user.username;
        res.redirect('/homepage');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

export { router };

export default UserService;