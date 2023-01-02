const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
    .connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const numberLengthValidator = (val) => {
    return val.length >= 8
}

const numberFormatValidator = (val) => {
    if (val.indexOf('-') === -1) return true
    const re = /^\d{2,3}-\d+$/g
    return re.test(val)
}

const numberValidators = [
    { validator: numberLengthValidator, msg: 'Number must be at least 8 characters' },
    { validator: numberFormatValidator, msg: 'Number is not the correct format' },
]

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: numberValidators,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)