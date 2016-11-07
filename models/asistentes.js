"use strict";
var config = require('../config');
var Sequelize = require('sequelize');
var Register = require('./register');

var Assistants = config.sequelize.define('assistants', {
    dni: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    university: {
        type: Sequelize.STRING,
        allowNull: true
    },
    year: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
}, {
    tableName: 'assistants'
});

Assistants.hasMany(Register);

module.exports = Assistants;