const { loginSchema } = require("./joiSchema")

module.exports.validateUserLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        res.status(400).json({ message: msg })
    } else {
        next()
    }
}