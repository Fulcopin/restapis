const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log("Token no proporcionado.");
    return res.status(408).send('JWT is missing');
  }


  const tokenParts = authHeader.split(' ');
  let token;

  if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
    token = tokenParts[1];
  } else {
    
    token = authHeader;
  }

  console.log("Token recibido:", token);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error en la verificación del JWT:", err);
      return res.status(408).send('Invalid JWT');
    }

    console.log("JWT decodificado:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
