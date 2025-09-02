const prompt = require('prompt-sync')()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Customer = require('./models/customer.js')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    await runQueries()

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')

    process.exit()
}

const runQueries = async () => {
    console.log('Welcome to the CRM \n')
    console.log('What would you like to do?\n')
    console.log('1. Create a customer')
    console.log('2. View all customers')
    console.log('3. Update a customer')
    console.log('4. Delete a customer')
    console.log('5. Quit\n')
    const action = prompt('Type the number of the action to run:')

    if (action == 1) {
        await createCustomer()
    } else if (action == 2) {
        await viewAllCustomers()
    }
}

const createCustomer = async () => {
    const username = prompt('Input customer name:')
    const userAge = prompt('Input customer\'s age:')

    const customerData = {
        name: username,
        age: userAge,
    }

    const customer = await Customer.create(customerData)
    console.log('New customer:', customer)
    runQueries()
}

const viewAllCustomers = async () => {
    const customers = await Customer.find({})
    console.log('All customers:', customers)

    runQueries()
}

connect()
