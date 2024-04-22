import User from "../models/User.js"


// @desc Add/REMOVE Favorite book
// @route POST /favorite/toggle
// @access Private

export const toggleFavoriteBook = async (req, res) => {
  const workId = req.body.workId
  if (!workId) return res.sendStatus(400)

  let user = await User.findById(req._id)
  if (!user) return res.sendStatus(400)

  let action
  let favorites = user.favorite_books
  let index = favorites.indexOf(workId)

  if (index == -1) {
    action = 'add'
    favorites.push(workId)
  }
  else { 
    action = 'remove'
    favorites.splice(index, 1) 
  }

  await user.save()
  res.status(200).json({ action })
}
