require('dotenv').config({ path: './assets/modules/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const app = express();
const PORT = 7777;

const corsOptions = {
  origin: 'https://ticket-front-end.vercel.app', // замените на ваш домен
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors());
app.use(bodyParser.json());

app.get("/test", async (_, res) => {
  res.json({message: "hello"})
})

app.post('/admin', async (req, res) => {
  
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password, gender, name },
    });
    res.json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user.email || !password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.json({ message: 'Login successful', user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/profile', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
