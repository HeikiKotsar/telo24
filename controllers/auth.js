const User = require('../models/User');
const config = require('config');
const asyncHandler = require('../middleware/async')

exports.register = asyncHandler (async (req, res, next) => {

    const { name, username, password, role} = req.body
    
    const user = await User.create({
        name,
        username,
        password,
        role
    });
        
    sendTokenResponse(user, 200, res);    
})

exports.login = asyncHandler (async (req, res, next) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: 'Palun sisestage õige  ja parool' });
    }

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return res.status(401).json({ msg: 'Vale kasutajatunnus või parool' });
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return res.status(401).json({ msg: 'Vale kasutajatunnus või parool' });
    }
        
    sendTokenResponse(user, 200, res);
})


const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + config.get('jwt_cookie_expire') * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true
    }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({ token })
}

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(0),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
    });
});