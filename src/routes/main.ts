import { Router } from 'express';
import { createUser, createUsers, getAllUsers, getUserByEmail } from '../services/user'

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Wild Bill',
        email:  'wild.bill@example.com',
        posts: {
            create: {
                title: 'Post 1 - Wild Bill',
                content: 'Content of post 1 - Wild Bill'
            }
        }
    })
    if (user) {
        res.status(201)
    } else {
        res.status(400)
    }

    res.json(user)
})

mainRouter.post('/users', async(req, res) => {
    const result = await createUsers([
        { name: 'Alice Smith', email: 'alice.smith@example.com' },
        { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
        { name: 'Charlie Brown', email: 'charlie.brown@example.com' },
        { name: 'David Wilson', email: 'david.wilson@example.com' }
    ])
    if (result) {
        res.status(201).json({ ok : true })
    } else {
        res.status(400).json({ error: 'Error creating users' })
    }
})

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers()
    if (users) {
        res.json({ users })
    } else {
        res.status(500).json({ error: 'Error fetching users' })
    }
})

mainRouter.get('/user', async (req, res) => {
    const user = await getUserByEmail('charlie.brown@example.com')
    if (user) {
        res.json( { user })
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})