const router =require('express').Router();

router.get('/', (req, res) => {res.send('hello people');});

module.exports = router;