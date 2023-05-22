const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

const { OAuth2Client } = require("google-auth-library");

class ControllerUser {

    static async register(req, res, next) {
        try {
            console.log(req.body);
            let { username, email, password, phoneNumber, address } = req.body;
            let newUser = await User.create({
                username,
                email,
                password,
                role: "Admin",
                phoneNumber,
                address
            })
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) throw { name: "email_required" }
            if (!password) throw { name: "password_required" }

            const findUser = await User.findOne({
                where: {
                    email,
                }
            })

            if (!findUser) throw { name: "invalid_email/password" }
            const passwordValidated = comparePassword(password, findUser.password)

            if (!passwordValidated) throw { name: "invalid_email/password" }
            const payload = {
                id: findUser.id,
            }

            const access_token = createToken(payload)
            console.log(access_token);

            const response = {
                access_token,
                email: findUser.email
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }



    static async loginWithGoogle(req, res, next) {
        try {
            const { token_google } = req.headers
            console.log(token_google,process.env.GOOGLE_CLIENT_ID,req.headers);
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "ini_dari_google",
                    role: "Staff",
                },
                hooks: false
            })
            const token = {
                id: user.id,
            }

            const access_token = createToken(token)

            const response = {
                access_token, email: user.email
            }
            res.status(created ? 201 : 200).json(response)
            console.log(user, "ini dari user");
            console.log(created, "ini dari created");
        }
        catch (error) {
            next(error)
        }
    }



}

module.exports = ControllerUser