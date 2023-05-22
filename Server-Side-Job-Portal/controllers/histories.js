const { history } = require('../models')

class Controller {
    static async getHistory(req, res, next) {
        try {
            let histories = await history.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
            })

            res.status(200).json(histories)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller