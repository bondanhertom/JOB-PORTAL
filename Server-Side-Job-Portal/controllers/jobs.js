const { Job, User, Company, history } = require('../models/index')

class Controller {

    static async editJob(req, res, next) {
        try {
            const { id } = req.params
            const job = await Job.findByPk(id)
            if (!job) throw { name: "Data Not Found" }

            //simpan product yg lama kedalam table history


            await Job.update({
                title: req.body.title,
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                companyId: req.body.companyId,
                authorId: req.user.id,
                jobType: req.body.jobType,
            },
                {
                    where: {
                        id: id,
                    },
                })
            await history.create({
                // jobId : job.id,
                name: req.body.title,
                description: `entity with id ${job.id} updated`,
                updatedBy: req.user.email
            })

            // query ulang ke tabel Job untuk mendapatkan data terbaru
            const updatedJob = await Job.findByPk(id);
            res.status(200).json(updatedJob);

        } catch (error) {
            next(error)
        }
    }


    static async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const job = await Job.findByPk(id);
            if (!job) {
                throw { name: 'Data Not Found' };
            }

            const oldStatus = job.status;

            // Update status job
            await job.update({
                status,
            });

            // Simpan perubahan status job ke dalam tabel history
            await history.create({
                jobId: job.id,
                name: job.title,
                description: `entity with ${job.id} status has been updated from ${oldStatus} into ${status}`,
                updatedBy: req.user.email,
            });

            res.status(200).json({ message: 'Job status updated' });

        } catch (error) {
            next(error)

        }

    }

    static async createJob(req, res, next) {
        try {

            let { title, description, imgUrl, companyId, jobType } = req.body
            let job = await Job.create({
                title,
                description,
                imgUrl,
                companyId,
                authorId: req.user.id,
                jobType,
                status: "Active",
            })

            console.log(job);


            await history.create({
                jobId: job.id,
                name: job.title,
                description: `new entity with id ${job.id} created`,
                updatedBy: req.user.email,
            });
            res.status(201).json(job)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getJobs(req, res, next) {
        try {
            let jobs = await Job.findAll({
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            res.status(200).json(jobs)
        } catch (error) {
            next(error)
        }
    }

    static async getJobsById(req, res, next) {
        try {
            const { id } = req.params
            let job = await Job.findByPk(id)
            if (!job) {
                throw { name: "Data Not Found" }
            }
            res.status(200).json(job)

        } catch (error) {
            next(error)
        }
    }


    static async deleteJob(req, res, next) {
        try {
            let { id } = req.params
            let job = await Job.findByPk(id)
            if (!job) {
                throw { name: "Data Not Found" }
            }
            await Job.destroy({ where: { id } })
            const response = {
                message: `${job.title} success to delete`,
            };
            res.status(200).json(response);

        } catch (error) {
            next(error)
        }
    }


}

module.exports = Controller