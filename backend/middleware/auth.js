import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  console.log('🔐 Auth middleware - Checking authorization...');
  console.log('Headers:', req.headers.authorization ? 'Authorization header present' : 'NO Authorization header');

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('✅ Token extracted:', token.substring(0, 20) + '...');
  }

  if (!token) {
    console.error('❌ No token found');
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified for user:', decoded.email);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'User role is not authorized to access this route' });
    }
    next();
  };
};
