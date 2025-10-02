import jwt from 'jsonwebtoken';
import {privateKey} from "./private_key.mjs";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, privateKey);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();

    } catch(error) {
        res.status(401).json({ error : error.message });
    }
};

export default auth;