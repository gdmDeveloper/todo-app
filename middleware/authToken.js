import jwt from 'jsonwebtoken';

const autenticar = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token is required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // id, name, email
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};
export default autenticar;
