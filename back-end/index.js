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
  origin: 'https://ticket-nfsf.vercel.app', // замените на ваш домен
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/test", async (req, res) => {
  res.json({message: "hello"})
})

app.post('/admin', async (req, res) => {
  const { email, password, gender, name } = req.body;
  console.log(password);
  
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password, gender, name },
    });
    res.json({ message: "User saved successfully" });
  } catch (error) {
    console.log("Error saving data:", error);
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
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    if (user.email && password) {
      res.json({ message: 'Login successful', user });
    } else {
      console.log('Invalid password for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/profile', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
