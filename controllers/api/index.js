const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/comments', projectRoutes);

module.exports = router;
