/*jshint esversion: 6 */
/*
 * REST handles to dump configuration
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json(global.gEnvironmentConfig);
})

module.exports = router

