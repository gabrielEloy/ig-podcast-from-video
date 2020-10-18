const {Router} = require('express');

const router = Router();

router.use('/', require('./main'))

module.exports = router;