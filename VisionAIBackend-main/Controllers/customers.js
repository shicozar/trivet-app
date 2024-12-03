const Customer = require("../Models/Customer")

const signup = async (req, res) => {

    const { username, email, password } = req.body
    console.log("Request reaches here");
    const customer = new Customer({ username, email, password })
    const resp = await customer.save()

    // Log the saved user document
    console.log('Customer saved:', resp);

    const data = {
        customer: { id: customer._id }
    }
    // console.log(process.env.SECRET);
    res.status(201).json({ success: true, customer: resp })
}

const getAllCustomer = async (req, res) => {

    try {
        const customer = await Customer.find({});
        res.status(201).send({ customers: customer });
    } catch (error) {
        res.send(400).send({ error: error })
    }

}

module.exports = {
    signup,
    getAllCustomer
}