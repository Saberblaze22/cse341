const express = require('express');
const bodyParser=require('body-parser');
const dotenv = require('dotenv').config();
const mongodb =require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const app = express();
const validator = require('express-validator');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'Get, Post, Put, Delete, Options');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use(cors({ origin: '*' }));
app.use('/', require('./routes/index.js'));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
},
function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !==undefined ? `logged in as ${req.session.user.displayname}` : 'logged out')});
app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/api-docs',session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

    
mongodb.initDb((err)=>{
    if (err){
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`databasse is listening and node Running on port ${port}`)});
    }
});