const guestMD = (req, res, next) => {
    if(req.session.userSession) { 
        return res.redirect('/profile')
    }
    next()
}

module.exports = guestMD;