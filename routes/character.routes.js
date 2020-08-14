module.exports = app => {
    const characters = require('../controllers/character.controller');
    let router = require ('express').Router();

    // Create new Character
    router.post('/create', characters.create);
    // Get all Characters
    router.get('/getall', characters.findAll);
    // Get single character by Id
    router.get('/:id', characters.findOne);
    // Update a character by id
    router.put('/update/:id', characters.update);
    // Delete a Character by id
    router.delete('/delete/:id', characters.delete);
    // Get a Users Characters
    router.get('/user/:userId', characters.getUserCharacters);

    app.use('/api/characters', router);
}
