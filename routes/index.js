const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('login');
});

router.get('/dashboard', (req, res) => {
    return res.render('dashboard');
});

module.exports = router;