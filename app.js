const prompt = require('prompt-sync')()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Customer = require('./models/customer.js')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)

    await crmPrompt()

    await mongoose.disconnect()

    process.exit()
}

const crmPrompt = async () => {
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
    } else if (action == 3) {
        await updateCustomer()
    } else if (action == 4) {
        await deleteCustomer()
    } else if (action == 5) {
        console.log('exiting...')
        mongoose.connection.close()
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
    console.log(`New customer - id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)

    await crmPrompt()
}

const viewAllCustomers = async () => {
    const customers = await Customer.find({})
    customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
    })

    await crmPrompt()
}

const updateCustomer = async () => {

    const customers = await Customer.find({})
    console.log('Below is a list of customers:\n')

    customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
    })

    const id = prompt('Copy and paste the id of the customer you would like to update here:')

    const newName = prompt('What is the customers new name?')

    const newAge = prompt('What is the customers new age?')

    await Customer.findByIdAndUpdate(
        id,
        { 
            name: newName,
            age: newAge
        },
        { new: true }
    )

    await crmPrompt()
}

const deleteCustomer = async () => {

    const customers = await Customer.find({})
    console.log('Below is a list of customers:\n')

    customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
    })

    const id = prompt('Copy and paste the id of the customer you would like to delete here:')

    await Customer.findByIdAndDelete(id)

    await crmPrompt()
}

connect()
