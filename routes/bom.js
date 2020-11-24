/*jshint esversion: 6 */
/*
 * REST BOM handler
 */
const express = require('express');
const requestPromise = require("request-promise");
const router = express.Router();

/*
 * /raw
 * This endpoint will return (in JSON) the entirety of the BOM response.
 */
router.get('/raw', (req, res) => {
    // Retrieve the URL endpoint to hit
    let bomUrl = global.gEnvironmentConfig.bom.url;
    let bomRequest = { url: bomUrl, json: true };

    // Initiate BOM request
    requestPromise(bomRequest)
        .then(function (bomJson) {
            // Present BOM data to the user
            res.json(bomJson);
        })
        .catch(function (bomErr) {
            // Handle errors
            console.error("bomErr: %s", bomErr);
            let errorMessage = `Error Connecting to BOM: ${bomErr}`;
            return res.status(503).send({error: errorMessage});
        });
});

module.exports = router;

