const authMD = (req, res, next) => {
    if(!req.session.userSession) { 
        return res.redirect('/')
    }
    next()
}

module.exports = authMD;