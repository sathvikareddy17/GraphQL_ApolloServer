const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// JSON File Path
const dataFilePath = path.join(__dirname, "../data/data.json");

// Read Data from JSON File
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Write Data to JSON File
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// GET all users
router.get("/", (req, res) => {
    res.json(readData());
});

// GET a single user by ID
router.get("/:id", (req, res) => {
    const users = readData();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// POST - Create a new user
// router.post("/", (req, res) => {
//     const users = readData();
//     const { name, email } = req.body;
//     const newUser = {
//         id: users.length + 1,
//         name,
//         email
//     };
//     users.push(newUser);
//     writeData(users);
//     res.status(201).json(newUser);
// });
router.post("/", (req, res) => {
    const users = readData();
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    writeData(users);

    console.log("New User Added:", newUser); // Debugging log
    res.status(201).json(newUser);
});


// PUT - Update a user
router.put("/:id", (req, res) => {
    const users = readData();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "User not found" });

    users[userIndex] = {
        ...users[userIndex],
        ...req.body
    };
    writeData(users);
    res.json(users[userIndex]);
});

// DELETE - Remove a user
router.delete("/:id", (req, res) => {
    let users = readData();
    users = users.filter(u => u.id !== parseInt(req.params.id));
    writeData(users);
    res.json({ message: "User deleted successfully" });
});

module.exports = router;
