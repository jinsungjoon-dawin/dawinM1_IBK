import express from 'express';
const router = express.Router();
// const aqtdb = require('../db/dbconn') ;
router.get('/', function (req, res, next) {
    // res.json({data:[11, 19, 3, 5, 2, 3, 20, 32]}) ;

    res.json({data:[Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100)
    ]}) ;
});

export default router;




