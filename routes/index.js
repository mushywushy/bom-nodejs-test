/*jshint esversion: 6 */
/*
 * REST index handler
 */
const express = require('express');
const requestPromise = require("request-promise");
const libWeather = require('../lib/weather');

const router = express.Router();

/*
 * /
 * This handler returns "simple" station data back to the user.
 * Data a subset of BOM data, which is deemed as "interesting".
 */
router.get('/', (req, res) => {
    // Retrieve the URL endpoint to hit
    let bomUrl = global.gEnvironmentConfig.bom.url;
    let bomRequest = { url: bomUrl, json: true };

    // Initiate BOM request
    requestPromise(bomRequest)
        .then(function (bomJson) {
            console.error("bomJson: %s", bomJson);
            // Take the BOM data, manipulate it and then return the interested station data
            let interestedBomStations = libWeather.getInterestedStations(bomJson.observations.data);
            let interestedStations = libWeather.convertBomStationsToSimpleStations(interestedBomStations);
            let sortedInterestedStations = libWeather.sortStationsByTemperatureAscending(interestedStations);
            res.json(sortedInterestedStations);
        })
        .catch(function (bomErr) {
            // Handle Errors
            console.error("bomErr: %s", bomErr);
            let errorMessage = `Error Connecting to BOM: ${bomErr}`;
            return res.status(503).send({error: errorMessage});
        });
});

module.exports = router;

