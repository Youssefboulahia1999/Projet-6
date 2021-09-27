//recuper pour verifier le token
const jwt = require('jsonwebtoken');

//exporter middlware
module.exports = (req, res, next) => {
  try {
      //recuper le token
    const token = req.headers.authorization.split(' ')[1];
  //decoder le token et le verifier
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
   //recuper le userId
    const userId = decodedToken.userId;
   //si le userId et qui  est diferent alors error
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
        //sinon next
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};