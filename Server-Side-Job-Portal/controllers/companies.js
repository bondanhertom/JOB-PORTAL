const { Company, history } = require('../models/index')

class ControllerCategory {

    static async createCompanies(req, res, next) {
        try {
            let { name, companyLogo, location, email, description } = req.body
            let company = await Company.create({
                name,
                companyLogo,
                location,
                email,
                description
            })


            await history.create({
                companyId: company.id,
                name: company.name,
                description: `new compnay with id ${company.id} created`,
                updatedBy: req.user.email,
            });

            res.status(201).json(company)
        } catch (error) {
            next(error)
        }
    }
    static async getCompanies(req, res, next) {
        try {
            let companies = await Company.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            res.status(200).json(companies)
        } catch (error) {
            next(error)
        }
    }

    static async getCompaniesById(req, res, next) {
        try {
            const { id } = req.params
            let company = await Company.findByPk(id)
            if (!company) {
                throw { name: "Data Not Found" }
            }
            res.status(200).json(company)

        } catch (error) {
            next(error)
        }
    }


    static async deleteCompanies(req, res, next) {
        try {
            let { id } = req.params
            let company = await Company.findByPk(id)
            if (!company) {
                throw { name: "Data Not Found" }
            }
            await Company.destroy({ where: { id } })
            const response = {
                message: `${company.name} success to delete`,
            };
            res.status(200).json(response);

        } catch (error) {
            next(error)
        }
    }




}

module.exports = ControllerCategory