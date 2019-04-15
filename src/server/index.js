require('dotenv').config();

const express = require('express');
const os = require('os');
const passport = require('passport');
const { Strategy } = require('passport-github');
const api = require('./api');

// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };


// const isAuthorized = (req, res, next) => {
//   const provider = req.path.split('/').slice(-1)[0];
//   const token = req.user.tokens.find(token => token.kind === provider);
//   if (token) {
//     next();
//   } else {
//     res.redirect(`/auth/${provider}`);
//   }
// };
test();

passport.use(new Strategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: '/auth/github/callback'
},
((accessToken, refreshToken, profile, cb) => cb(null, profile))));
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/api/github');
});


app.get('/api/github', ensureLoggedIn('/auth/github'), api.getGithub);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
