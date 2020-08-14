const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username){
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password,
        isActive: true
    };

    // Save the new User in the DB
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error has occurred while creating a user.'
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    let condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    User.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while trying to retrieve all users from db.'
            });
        });
};

// Find a single User by Id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error getting user by Id"
            });
        });
};

// Update a User by id in request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: 'Users was updated Successfully.'
                });
            } else {
                res.send({
                    message: 'Unable to update User.'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating user by id.'
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Authenticate a User
exports.authenticate = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        where: {
            username: {[Op.eq] : username}
        }
    })
        .then(data => {
            if (data.dataValues.password === password){
                res.send(data);
            }else {
                res.send({
                    message: "incorrect password"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: 'some error has occurred trying to authenticate'
            });
    });
}
