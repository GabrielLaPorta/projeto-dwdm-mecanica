const path = require("path");
const cookieParser = require("cookie-parser");
const keys = require(path.join(__dirname, "../../", "/api/keys.js"));

const UserRepository = require(path.join(__dirname, "../../", "/api/repository/user"));

class UserService {
    static logOut(session) {
        try {
            return session.destroy();
        } catch (error) {
            return error;
        }
    }

    static async save(data) {
        try {
            const savedUser = await UserRepository.save(data);

            return await UserService.authenticate(savedUser.email, savedUser.senha);
        } catch (error) {
            return error;
        }
    }

    static createUserSession(session, user) {
        const promise = new Promise((resolve, reject) => {
            session.save(() => {
                session.user = user;
                resolve();
            });
        });

        return promise;
    }

    static async authenticate(id, email) {
        try {
            const user = await UserRepository.findAuthenticatedUser(id, email);

            if (user.rows[0]) {
                return user.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            return error;
        } 
    }

    static async checkAuthentication(session, userId) {
        userId = cookieParser.signedCookie(userId, keys.cookieSecret);
        return session === userId;
    }

    static async userExist(email) {
        try {
            const result = await UserRepository.userCount(email);

            return parseInt(result.rows[0].rows) === 0;
        } catch (error) {
            return error;
        } 
    }
}

module.exports = UserService;