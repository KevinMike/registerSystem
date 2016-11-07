"use strict";
var Sequelize = require('sequelize');
/*module.exports.database = {
 host : '212.8.251.77',
 bd : 'ciis',
 user : 'ciis',
 password : 'ciistacna'
 };*/
module.exports.sequelize = new Sequelize('ciis', 'ciis', 'ciistacna', {
    host: '212.8.251.77',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

