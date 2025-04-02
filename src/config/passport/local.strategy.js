import { Strategy } from "passport-local";
import { userDao } from "../../presistence/mongo/dao/user.dao.js";
import { comparePassword, hashPassword } from "../../utils/hashPassword.js";
import passport from "passport";




const registerStrategy = new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
        try {
            const user = await userDao.getOne({ email: username });
            if (user) return done(null, false, { message: "El usuario ya existe" });

            const newUser = {
                ...req.body,
                password: hashPassword(password),
            };

            const userCreate = await userDao.create(newUser);

            return done(null, userCreate);
        } catch (error) {
            done(error);
        }
    }
);


passport.use("register", registerStrategy);


const loginStrategy = new Strategy(
    { usernameField: "email" },
    async (username, password, done) => {
        try {
            const user = await userDao.getOne({ email: username });
            if (!user || !comparePassword(user.password, password)) return done(null, false, { message: "email o password no validos" });

            return done(null, user);

        } catch (error) {
            done(error)
        };
    }
);

passport.use("login", loginStrategy);

// Serialization
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialized
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userDao.getOne({ _id: id });
        done(null, user);
    } catch (error) {
        done(error);
    }
});