const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/post.controller')
const router = Router()

router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  ctr.create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  ctr.getAll
)
router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.getByID
)
router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.update
)
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)

router.get(
  '/admin/get/analytics',
  passport.authenticate('jwt', {session: false}),
  ctr.getAnalytics
)

router.get('/', ctr.getAll)
router.get('/:id', ctr.getByID)
router.put('/add/view/:id', ctr.addView)


module.exports = router
