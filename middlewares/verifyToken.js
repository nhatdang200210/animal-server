const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authorizationHeader = req.header('authorization');

  if (!authorizationHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'No token provided',
    });
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.user = { userId };
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token',
    });
  }
};