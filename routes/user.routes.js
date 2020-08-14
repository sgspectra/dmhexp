module.exports = app => {
    const users = require('../controllers/user.controller');
    let router = require('express').Router();

    // Create new User
    router.post('/create', users.create);
    // Get all Users
    router.get('/getall', users.findAll);
    // Get single user by Id
    router.get('/:id', users.findOne);
    // Update a user by id
    router.put('/update/:id', users.update);
    // Delete a User by id
    router.delete('/delete/:id', users.delete);
    // Authenticate a User
    router.post('/authenticate', users.authenticate);


    app.use('/api/users', router);
}
