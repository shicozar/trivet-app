const { customerSchema } = require("./joiSchema")

module.exports.validateUserRegister = (req, res, next) => {
    const { error } = customerSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        res.status(400).json({ message: msg })
    } else {
        next()
    }
}