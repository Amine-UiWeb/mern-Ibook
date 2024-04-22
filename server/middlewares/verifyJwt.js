import jwt from 'jsonwebtoken'


export const verifyJwt = (req, res, next) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization

  // Auth header contain the accessToken?
  if (!authHeader || authHeader == 'Bearer null')
    return res.status(401).json({ message: 'Unauthorized' })
  
  // Get the accessToken from the authHeader String
  const token = authHeader.split(' ')[1]

  jwt.verify(
    token, 
    process.env.SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(401)

      req._id = decoded._id
      next()
    }
  )
}
