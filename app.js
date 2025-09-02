const prompt = require('prompt-sync')()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const username = prompt('What is your name? ')

console.log(`Your name is ${username}`)
