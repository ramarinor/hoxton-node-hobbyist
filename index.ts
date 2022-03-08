import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/users', async (req, res) => {
  const users = await prisma.users.findMany({
    include: { hobbies: { include: { hobby: true } } }
  });
  res.send(users);
});
app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.users.findUnique({
    where: {
      id: id
    },
    include: { hobbies: { include: { hobby: true } } }
  });
  res.send(user);
});
app.post('/users', async (req, res) => {
  const { fullName, photoUrl, email } = req.body;
  const errors = [];

  if (typeof fullName !== 'string')
    errors.push('fullName is missing or not a string!');
  if (typeof photoUrl !== 'string')
    errors.push('photoUrl is missing or not a string!');
  if (typeof email !== 'string')
    errors.push('email is missing or not a string!');

  if (errors.length === 0) {
    const user = await prisma.users.create({
      data: {
        fullName: fullName,
        photoUrl: photoUrl,
        email: email
      }
    });
    res.send(user);
  } else {
    res.status(401).send(errors);
  }
});
app.get('/hobbies', async (req, res) => {
  const hobbies = await prisma.hobbies.findMany({
    include: { users: { include: { user: true } } }
  });
  res.send(hobbies);
});
app.get('/hobbies/:id', async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobbies.findUnique({
    where: {
      id: id
    },
    include: { users: { include: { user: true } } }
  });
  res.send(hobby);
});
app.post('/hobbies', async (req, res) => {
  const { name, imageUrl } = req.body;
  const errors = [];

  if (typeof name !== 'string') errors.push('name is missing or not a string!');
  if (typeof imageUrl !== 'string')
    errors.push('imageUrl is missing or not a string!');

  if (errors.length === 0) {
    const hobby = await prisma.hobbies.create({
      data: {
        name: name,
        imageUrl: imageUrl
      }
    });
    res.send(hobby);
  } else {
    res.status(401).send(errors);
  }
});
app.listen(PORT, () => {
  console.log(`Server up and running: http://localhost:${PORT}`);
});
