import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

const jwtsecret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {

      decodedData = jwt.verify(token, jwtsecret);
      req.userId = decodedData?.id;
      req.name = decodedData?.name;

    } else {

      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      req.name = decodedData?.given_name;

    }
    next();

  } catch (error) {
    console.log(error);
  }
};

export default auth;
