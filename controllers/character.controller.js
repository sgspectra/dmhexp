const db = require('../models');
const Character = db.characters;
const Op = db.Sequelize.Op;

// Create and Save a new Character
exports.create = (req, res) => {
    // Validate request
    if (!req.body.characterName){
        res.status(400).send({
            message: 'Content cannot be empty'
        });
        return;
    }

    // Create a Character
    const character = {
        characterName: req.body.characterName,
        characterClass: req.body.characterClass,
        level: req.body.level,
        characterRace: req.body.characterRace,
        alignment: req.body.alignment,
        playerName: req.body.playerName,
        experience: req.body.experience,
        userId: req.body.userId
    };

    // Save the character in the DB
    Character.create(character).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error has occurred while creating a user'
        });
    });
};

// Retrieve all Characters from the database.
exports.findAll = (req, res) => {
    const characterName = req.query.characterName;
    let condition = characterName ? { characterName: { [Op.like]: `%${characterName}%` } } : null;

    Character.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while trying to retrieve all characters from db.'
            });
        });
};

// Retrieve all Characters that have a certain User
exports.getUserCharacters = (req, res) => {
    const userId = req.params.userId;

    Character.findAll({
        where: {
            userId: {
                [Op.eq] : userId
            }
        }
    })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'A message has occurred getting characters by user id'
            })
    })
}

// Find a single Character by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Character.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 'Error getting Character by ID'
        });
    });
};

// Update a Character by id in request
exports.update = (req, res) => {
    const id = req.params.id;

    Character.update(req.body, {
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

// Delete a Character with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Character.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Character with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Character with id=" + id
            });
        });
};
