import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"


const genAccessToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1h' })

const genRefreshToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })


// @desc Register user
// @route POST /auth/register
// @access Public

export const register = async (req, res) => {
  // Are credentials set? 
  const { email, username, password } = req.body
  if (!email || !username || !password) 
    return res.status(401).json({ error: 'All credentials must be set!' })

  // Email used?
  const exists = await User.findOne({ email })
  if (exists) return res
    .status(409).json({ error: 'Email taken! Try a different one.' })

  // Encrypt the password
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  
  // Register the user
  const credentials = { email, username, password: hashedPassword }
  const user = await User.create(credentials)

  // Create jwts 
  const aT = genAccessToken(user._id)
  const rT = genRefreshToken(user._id)

  // send refreshToken in a cookie
  res.cookie('jwt', rT, {
    maxAge: 3 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    httpOnly: false, // accessible only by web server 
    sameSite: 'None', // cross-site cookie
    secure: true, // https
  })

  // return user information and accessToken
  user.password = null
  res.status(200).json({ message: 'Registeration seccessful.', aT, user })
}


// @desc Login user
// @route POST /auth/login
// @access Public

export const login = async (req, res) => {
  // Are credentials valid?
  const { email, password } = req.body
  if (!email || !password) 
    return res.status(401).json({ error: 'All credentials must be set!' })

  // User registered?
  const user = await User.findOne({ email })
  if (!user) return res.status(409).json({ error: 'Email is not registered!' })

  // Verify the password
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'Invalid credentials!' })

  // create jwts 
  const aT = genAccessToken(user._id)
  const rT = genRefreshToken(user._id)

  
  // send refreshToken in a cookie
  res.cookie('jwt', rT, {
    maxAge: 3 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    httpOnly: false, // accessible only by web server
    sameSite: 'None', // cross-site cookie
    secure: true, // https
  })

  // return user information and accessToken
  user.password = null
  res.status(200).json({ message: 'Login seccessful.', aT, user })
}


// @desc Refresh Token
// @route POST /auth/refresh
// @access Public

export const refresh = async (req, res) => {
  
  // Is cookie received? 
  let rT = req.cookies?.jwt
  if (!rT) return res.sendStatus(403)

  // Verifying refreshToken
  jwt.verify(rT, process.env.SECRET, async (err, decoded) => {

    if (err) return res.sendStatus(403)

    else {
      // Get user data 
      const user = await User.findOne({ _id: decoded._id })
      if (!user) return res.status(409).json({ error: 'Email is not registered!' })
      
      // create new accessToken 
      const aT = genAccessToken(user._id)
      
      // return user information and accessToken
      user.password = null
      res.status(200).json({ message: 'Refresh seccessful.', aT, user })
    }

  })

}


// @desc Logout user
// @route POST /auth/logout
// @access Public
export const logout = async (req, res) => {
  if (!req.cookies?.jwt) return res.sendStatus(204)  // No content
  
  res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true })
  res.status(200).json({ message: 'Logout seccessful.'})
}

