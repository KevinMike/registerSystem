"use strict";
var config = require('../config');
var Sequelize = require('sequelize');

var Register = config.sequelize.define('register', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'register'
});


module.exports = Register;