const router = require("express").Router();
const {
  models: { User, Phrase },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");
module.exports = router;

//also update in completionpage component
const maxTier = 6;

//will get all users, only firstname and points for leaderboard
router.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["firstname", "points"],
      order: [
        ['points', 'DESC']
      ],
      limit: 5
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});


//will update single user
router.put('/user', requireToken, async (req,res,next) => {
  try {
    const {email, password, firstname, lastname} = req.body;

    const updatedUser = await req.user.update({email, password, firstname, lastname})

    res.send(updatedUser).status(202)
  } catch (error) {
    next(error)
  }
})


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

//will get the highest learning and testing tier for a user
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
    const highestLearningTier = userPhrases.phrases[0].tiers
    let highestTestTier = userPhrases.phrases.filter(phrase => {
      return phrase.phraseUser.isComplete === true
    })
    highestTestTier = highestTestTier[0] ? highestTestTier[0].tiers : 0

    res.json({highestLearningTier, highestTestTier})
  } catch (error) {
    next(error);
  }
});

router.get("/userPhrases")
