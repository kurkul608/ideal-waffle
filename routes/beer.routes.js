const {Router} = require('express')
const Beer = require('../models/beer')
const {check, validationResult } = require('express-validator')
const router = Router()


router.post('/new', [
    check("name", "Введите название").exists(),
    check("manufacturer", "Введите производителя").exists(),
    check("fortress", "Введите значение крепости").exists(),
    check("country", "Введите страну - производитель").exists(),
    check("color", "Введите оттенок").exists(),
    check("filtration", "Введите параметр фильтрованности").exists(),
    check("style", "Введите стиль пива").exists(),
    // check("capsule", "Введите наличие капсулы").exists(),
],
    async (req, res) =>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array(),
                    message: "Неполные данные",
                });
        }

        const {name, manufacturer,  fortress, country, color, filtration, style, capsule, flowTemperature} = req.body
        const beer = new Beer({name, manufacturer,  fortress, country, color, filtration, style, capsule, flowTemperature})

        await beer.save()
        res.status(201).json({message: 'Пивко загружено'})

    } catch (e) {
        res.status(500).json({ message: "Братан, у тебя 500" });
    }
} )

router.get('/', async (req, res) =>{
    try {
        const beer = await Beer.find({})
        res.json({beer})
    } catch (e) {
        res.status(500).json({ message: "Братан, у тебя 500" });
    }

} )

router.get('/:id', async (req, res) =>{
    try {
        const beer = await Beer.findById(req.params.id)
        res.json({beer})
    } catch (e) {
        res.status(500).json({ message: "Братан, у тебя 500" });
    }

} )

module.exports = router