const { Job } = require('../models')

async function authorization(req, res, next) {
    try {
        let jobId = req.params.id
        let job = await Job.findByPk(jobId)
        console.log(job);

        if (!job) throw { name: "Data Not Found" }

        console.log(job.authorId, req.user.id);

        if (req.user.role !== "Admin" && req.user.id !== job.authorId) {
            throw ({ name: "Forbidden" })
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authorization }