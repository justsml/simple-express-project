module.exports = {
  loginRequired,
}

function loginRequired(req, res, next) {
  if (req.user) {
    next()
  }
  return res.status(503).send({error: 'Login required'})
}
