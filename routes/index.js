const router = require('express').Router();
const { ensureGuest, ensureAuth } = require('../middlewares/auth');

router.get('/', ensureGuest, (req, res) => {
    return res.render('login');
});

router.get('/dashboard', ensureAuth, (req, res) => {
    return res.render('dashboard', { user: req.user });
});

module.exports = router;