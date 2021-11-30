const router = require("express").Router();
const {
  models: { User, Phrase },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");
module.exports = router;

//also update in completionpage component
const maxTier = 6;

//will get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//will update the iscomplete for current tier and associate next tier
router.put("/update/:tierId", requireToken, async (req, res, next) => {
  try {
    const userPhrases = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: {
        model: Phrase,
        where: {
          tiers: req.params.tierId,
        },
      },
    });
    userPhrases.phrases.forEach(async phrase => {
      await phrase.phraseUser.update({ isComplete: true });
    });
    if (req.params.tierId < maxTier) {
      const nextTier = await Phrase.findAll({
        where: {
          tiers: Number(req.params.tierId) + 1,
        },
      });
      await userPhrases.addPhrases(nextTier);
    }
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

//will get all associated phrases for a user
router.get("/maxTier", requireToken, async (req, res, next) => {
  try {
    const userPhrases = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: {
        model: Phrase,
      },
      order: [
        [Phrase, 'tiers', 'DESC']
      ]
    });
    const highestUserTier = userPhrases.phrases[0].tiers
    res.json({highestUserTier})
  } catch (error) {
    next(error);
  }
});

router.get("/userPhrases")
