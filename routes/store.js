const express = require('express');
const { GetCarousels, GetCatgories, InsertCarousel, InsertCatgories } = require('../controllers/store.controller');
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const carousels = await GetCarousels();
    const categories = await GetCatgories();
    res.send({carousels,categories});
});

router.post('/carousels', async (req, res) => {
    const carousel_data = req.body
    console.log(carousel_data);
    const addCarousel = await InsertCarousel(carousel_data);
    if (addCarousel) {
        res.sendStatus
    } else {
        res.send("Error adding carousel")
    }
});

router.post('/categories', async (req, res) => {
    const {category_data} = req.body
    const addCategory = await InsertCatgories(category_data);
    if (addCategory) {
        res.sendStatus
    } else {
        res.send("Error adding carousel")
    }
});

module.exports = router;
