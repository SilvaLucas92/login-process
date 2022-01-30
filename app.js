const express = require('express');
const app = express();
const session = require('express-session');
const mainRoutes = require('./routes/mainRoutes');

app.listen(3000, () => {
    console.log('Localhost 3000')
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret:"it's a secret",
    resave: false,
    saveUninitialized: false
}));
app.use('/', mainRoutes);


app.set('view-engine', 'ejs');


