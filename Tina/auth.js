// In your Express app setup
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Import the Google authentication strategy and User model
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/UserData');

// Configure Passport to use Google authentication
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails, photos } = profile;
  try {
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        googleId: id,
        email: emails[0].value,
        name: displayName,
        avatar: photos[0].value
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Route for initiating the Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling the callback from Google OAuth
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to wherever you want
    res.redirect('/dashboard');
  });

module.exports = router;
