const router =require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['hello world']
    res.send('hello people');});

router.use('/users', require('./users'));

module.exports = router;