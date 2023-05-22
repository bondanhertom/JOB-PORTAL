const { Customer, Job, Bookmark, Company } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Op } = require('sequelize');
const axios = require('axios');

const { OAuth2Client } = require("google-auth-library");

class ControllerCustomers {

    static async register(req, res, next) {
        try {
            console.log(req.body);
            let { email, password } = req.body;
            let newCust = await Customer.create({
                email,
                password,
                role: "Customer",
            });
            const { id, email: userEmail, role } = newCust.toJSON(); // menggunakan destructuring pada objek newCust dan mengambil hanya properti yang diperlukan
            res.status(201).json({ id, email: userEmail, role });
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) throw { name: "email_required" }
            if (!password) throw { name: "password_required" }

            const findUser = await Customer.findOne({
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
                email: findUser.email,
                userId: findUser.id
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async loginWithGoogle(req, res, next) {
        try {
            const { token_google } = req.headers
            console.log(token_google, process.env.GOOGLE_CLIENT_ID, req.headers);
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });

            const payload = ticket.getPayload();
            const [customer, created] = await Customer.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    email: payload.email,
                    password: "ini_dari_google",
                    role: "Customer",
                },
                hooks: false
            })
            const token = {
                id: customer.id,
            }

            const access_token = createToken(token)

            const response = {
                access_token, email: customer.email, userId: customer.id
            }
            res.status(created ? 201 : 200).json(response)
            console.log(customer, "ini dari customer");
            console.log(created, "ini dari created");
        }
        catch (error) {
            next(error)
        }
    }

    static async getJobs(req, res, next) {
        try {
            const { filter } = req.query;
            const pageAsNumber = Number.parseInt(req.query.page);
            const sizeAsNumber = Number.parseInt(req.query.size);

            let page = 0;
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber;
            }

            let size = 9;
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
            }

            let jobs;
            if (filter) {
                jobs = await Job.findAndCountAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.iLike]: `%${filter}%`,
                                },
                            },
                            {
                                title: {
                                    [Op.iLike]: `%${filter.split('').join('%')}%`,
                                },
                            },
                        ],
                    },
                    limit: size,
                    offset: page * size,
                });
            }
            else {
                jobs = await Job.findAndCountAll({
                    limit: size,
                    offset: page * size,
                });
            }

            res.status(200).json({
                jobs: jobs.rows,
                totalPages: Math.ceil(jobs.count / size),
            });
        } catch (error) {
            next(error);
        }

    }

    static async getDetailJob(req, res, next) {
        try {
            let { id } = req.params
            let { current_url } = req.headers
            console.log(current_url);
            let jobById = await Job.findByPk(id, {
                include: [Company],
            });
            if (!jobById) throw { name: "Data Not Found" }

            const baseUrl = "https://api.qr-code-generator.com/v1/create?access-token="

            const { data } = await axios({
                method: "POST",
                url: baseUrl + process.env.QR_ACCESS_TOKEN,
                headers: {},
                data:
                {
                    frame_name: "bottom-frame",
                    qr_code_text: current_url,
                    image_format: "SVG",
                    frame_color: "#0D3880",
                    frame_text_color: "#ffffff",
                    frame_icon_name: "mobile",
                    frame_text: "Scan me",
                    marker_left_template: "version13",
                    marker_right_template: "version13",
                    marker_bottom_template: "version13"
                }
                
            })
            // console.log(data);

            jobById.dataValues.qr = data

            res.status(200).json(jobById)

        } catch (error) {
            next(error)
        }
    }




    static async createBookmark(req, res, next) {
        const { userId, jobId } = req.body;

        try {
            const existingBookmark = await Bookmark.findOne({ where: { UserId: userId, JobId: jobId } });
            if (existingBookmark) {
                throw { name: 'Bookmark already exists' };
            }

            const bookmark = await Bookmark.create({ UserId: userId, JobId: jobId });
            res.status(201).json(bookmark);
        } catch (error) {
            next(error)
        }
    }





    static async getBookmarkByUserId(req, res, next) {
        try {
            let bookmark = await Bookmark.findAll({
                where: { UserId: req.params.id },
                include: Job
            })
            res.status(200).json(bookmark)

        } catch (error) {
            next(error)

        }
    }




}

module.exports = ControllerCustomers