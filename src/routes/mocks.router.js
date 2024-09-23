import { Router } from "express";
import { createHash } from "../utils/hash.js"; 
import { userModel } from "../Daos/models/user.model.js"; 

const router = Router();

const generateUsers = async (numUsers) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const role = Math.random() < 0.5 ? "user" : "admin"; 
        const user = {
            first_name: `User${i + 1}`,
            last_name: `Last${i + 1}`,
            age: Math.floor(Math.random() * 50) + 18, 
            email: `user${i + 1}@example.com`,
            password: await createHash("coder123"), 
            role,
            pets: []
        };
        users.push(user);
    }
    return users;
};

router.get("/mockingusers", async (req, res) => {
    try {
        const users = await generateUsers(50); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/generateData", async (req, res) => {
    const { users, pets } = req.body;

    if (!Number.isInteger(users) || users <= 0) {
        return res.status(400).json({ error: "El número de usuarios debe ser un entero positivo." });
    }
    if (!Number.isInteger(pets) || pets < 0) {
        return res.status(400).json({ error: "El número de mascotas debe ser un entero no negativo." });
    }
    
    try {
        const userList = await generateUsers(users);
        await userModel.insertMany(userList);

        res.status(201).json({ message: `${users} usuarios creados` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
