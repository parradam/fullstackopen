const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5 || process.argv.length === 4) {
    console.log('Please provide the password: node mongo.js <password>')
    console.log('Or: node mongo.js <password> "<name>"" <number>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@cluster0.oq8xa0y.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    // display all entries (if provided with node mongo.js <password>)
    mongoose
        .connect(url)
        .then(result => {
            console.log('connected')

            Person
                .find({})
                .then(persons => {
                    console.log('phonebook:')
                    persons.forEach(person => {
                        console.log(person.name, person.number)
                    })
                    mongoose.connection.close()
                })
        })
} else if (process.argv.length === 5) {
    // add to DB (if provided with node mongo.js <password> "<name>"" <number>)
    const name = process.argv[3]
    const number = process.argv[4]

    mongoose
        .connect(url)
        .then(result => {
            console.log('connected')

            const person = new Person({
                name: name,
                number: number,
            })

            return person.save()
        })
        .then(() => {
            console.log('person saved')
            return mongoose.connection.close()
        })
        .catch(err => console.log(err))
}