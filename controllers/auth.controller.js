import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Checks email is not already used.
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json({ error: 'Email already exists' });

  // Password hash

  const hash = await bcrypt.hash(password, 10);

  // Create user

  const newUser = await User.create({ name, email, password: hash });
  res.status(201).json({ message: 'User created', newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Checks user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(404).json('Invalid email address or password');

  // Checks password with the hash
  console.log('hasta aqui va');
  console.log(password);
  console.log('user: ', user.password);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(404).json('Invalid email address or password');

  // Create and send the JWT
  const token = jwt.sign(
    { id: user.id, email: user.email }, // payload
    process.env.JWT_SECRET, // secret
    { expiresIn: '7d' }, // expires in 7 days
  );

  res.json({ token });
};

export { register, login };
