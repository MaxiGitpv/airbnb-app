const rolAsminMiddleware = (req, res, next) => {
    
    const rol = req.user.rol
    if(rol === 'admin'){
        next()
    }else {
        res.status(400).json({status: 'error', message: 'User not authorized to make this request'})
    }
}

exports.rolAsminMiddleware = rolAsminMiddleware  
