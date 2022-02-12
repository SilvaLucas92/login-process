const fs = require('fs');
const path = require('path');
const userPath = path.join(__dirname, '../data/userData.json');
const userData = JSON.parse(fs.readFileSync(userPath, 'utf-8'));
const bcryptjs = require('bcryptjs');

const controller = {
    login: (req, res) => {
        res.render('../views/login.ejs');
    },
    loginProcess: (req, res) => {
        function userLogged (field, text) {
            let userLogin = userData.find( user => user[field] === text);
            return userLogin
        };
        let userLogin = userLogged('email', req.body.email);
        if (userLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userLogin.password);
            if(passwordOk) {
                delete userLogin.password;
                req.session.userSession = userLogin;
                return res.redirect('/profile')
            }
            const errorValidation = 'contraseña equivocada'
            return res.render('../views/login.ejs', {
                errorPassword: errorValidation
            });
        }
        const errorValidation = 'No se encuentra el email'
        return res.render('../views/login.ejs', {
            errorEmail: errorValidation
        });
    },

    register: (req, res) => {
        res.render('../views/register.ejs');
    },

    profile: (req, res) => {
        res.render('../views/profile.ejs', {
            user: req.session.userSession
        })
    },

    home:  (req, res) => {
        res.render('../views/home.ejs', {
            user: req.session.userSession
        })
    },

    store: (req, res) => {
        function userLogged (field, text) {
            let userLogin = userData.find( user => user[field] === text);
            return userLogin
        }
        let userLogin = userLogged('email', req.body.email);
        if (userLogin) {
            res.send('ya estas logueado');
        }
        const idGenerator = () => {
            let lastUser = userData[userData.length - 1];
            let lastId = lastUser.id;
            return lastId + 1;
        }
        userData.push({
            ...req.body,
            id: idGenerator(),
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : 'estante.jpg',
        });
        fs.writeFileSync(userPath, JSON.stringify(userData, null, ' '));
        return res.redirect('/');
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = controller;