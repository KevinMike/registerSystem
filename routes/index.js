var express = require('express');
var router = express.Router();
var assistants = require('../models/asistentes');
var register = require('../models/register');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'XVII Congreso de Ingeniería de Sistemas'});
});
router.get('/asistentes', function (req, res) {
    assistants.findAll()
        .then(function (data) {
            res.render('assistants',{assistants:data});
        })
        .catch(function (err) {
            res.send('Catch a error: ' + err)
        })
});

router.post('/registrar-asistente', function (req, res) {
    assistants
        .findOrCreate({where: {dni: req.body.dni}, defaults: req.body})
        .spread(function(user, created) {
            if(created)
                return res.status(200).send({message:'Se registró al participante con éxito'});
            else
                return res.status(401).send({message:user.firstname + ' ' + user.lastname + ' ya se encuentra registrado con este número de DNI'});
        });
});

router.post('/registrar', function (req, res) {
    console.log('dsfdsfds '+req.body);
    assistants.findOne({
        where: {dni: req.body.dni}
    })
        .then(function (dni) {
            if (dni != null)
                register.create({
                    assistantDni: req.body.dni,
                    date: new Date()
                })
                    .then(function (data) {
                        return res.status(200).send({message:'Se marcó el registro de asistencia con éxito'});
                    })
                    .catch(function (err) {
                        return res.status(401).send({message:err});
                    });
            else
                return res.status(401).send({message:'No esta registrado este número de DNI'});

        })
        .catch(function (err) {
            return res.status(401).send({message:err});
        })
});

var config = require('../config');
router.get('/sincronizar', function (req, res) {
    config.sequelize.sync({force: true})
        .then(function () {
            res.send('ok')
        })
        .catch(function (err) {
            res.send(err);
        })
});

module.exports = router;