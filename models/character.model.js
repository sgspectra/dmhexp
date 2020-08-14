const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Character = sequelize.define('character', {
        // id is created by default
        // created timestamp is default
        // modified timestamp is default
        characterName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        characterClass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1

        },
        characterRace: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alignment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        playerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        }
    });
    return Character;
}
