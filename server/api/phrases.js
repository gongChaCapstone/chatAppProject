const router = require('express').Router()
const { models: { User, Phrase }} = require('../db')
module.exports = router


router.get('/:tierId', async (req, res, next) => {
  try {
    const tier = await Phrase.findAll({
      where: {
        tiers: req.params.tierId
      }
    })

    res.json(tier)
  } catch (error) {
    next(error)
  }
})
