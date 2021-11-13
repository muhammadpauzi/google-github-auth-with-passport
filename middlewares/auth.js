module.exports.ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/');
    }
}

module.exports.ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        next()
    }
}