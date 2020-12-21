const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    name: {type: String, required: true, unique:  false},
    manufacturer: {type: String, required: true},
    fortress: {type: String, required: true},
    country: {type: String, required: true},
    color: {type: String, required: true},
    filtration: {type: String, required: true},
    style: {type: String, required: true},
    capsule: {type: Boolean, required: true},
    flowTemperature: {type: Number, required: false}
})

module.exports = model('Beer', schema)