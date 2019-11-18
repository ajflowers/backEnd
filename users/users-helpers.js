module.exports = {
    validateFarmer
};

function validateUser(farmer) {
    let errors = [];

    if (!farmer.username || farmer.username.length < 2) {
        errors.push("Please include a username with at least 2 characters");
    }

    if (!farmer.password || farmer.password.length < 2) {
        errors.push("Please include a password with at least 2 characters");
    }
    // console.log(errors)
    // console.log(farmer.farmername)
    // console.log(farmer.password)
    
    return {
        isSuccessful: errors.length > 0 ? false : true,
        errors
    };
}