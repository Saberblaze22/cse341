const router =require('express').Router();

router.get('/', (req, res) => {res.send('hello people');});

router.use('/users', require('./users'));

module.exports = router;