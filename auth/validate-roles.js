module.exports = {
    validateCustomer,
    validateFarmer
}

function validateCustomer(req, res, next) {
    if (req.decodedJwt.role === 'customer') {
        next();
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
}

function validateFarmer(req, res, next) {
    if (req.decodedJwt.role === 'farmer') {
        next();
    } else {
        res.status(401).json({ message: 'You do not have the correct user role for this action.' });
    }
}