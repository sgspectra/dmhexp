module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        // id is created by default
        // created timestamp is default
        // modified timestamp is default
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATE
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
        }

    });
    return User;
};
