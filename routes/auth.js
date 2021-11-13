const passport = require('passport');
const router = require('express').Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;