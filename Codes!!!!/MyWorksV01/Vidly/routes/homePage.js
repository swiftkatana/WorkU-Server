const express = require('express');
const router = express.Router();
// const helmet = require('helmet');
// const morgan = require('morgan');
// const fs = require('fs');
// const Joi = require('joi');


router.get('/', (req, res) => {
    res.sendFile('D:/MyWorks/Vidly/public/html/wellcome.html');

});



module.exports = router;