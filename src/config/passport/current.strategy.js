import { ExtractJwt, Strategy } from "passport-jwt";
import { userDao } from "../../presistence/mongo/dao/user.dao.js";
import passport from "passport";
import envsConfig from "../envs.config.js";



const cookieExtractor = (req) => {

    let token = null;

    if (req && req.cookies) {
        token = req.cookies.token
    }

    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey: envsConfig.JWT_SECRET,
};


const curretStrategy
    = new Strategy(jwtOptions, async (payload, done) => {
        try {
            if (payload) {
                const user = await userDao.getOne({ email: payload.email });
                return done(null, user);
            }

            return done(null, false);

        } catch (error) {
            done(error);
        }
    });

passport.use("jwt", curretStrategy);