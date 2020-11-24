/*jshint esversion: 6 */
/*
 * We are interested in weather, but only in specific weather patterns.
 * This library is our logic of those specific patterns.
 */

const isInterestedStation = function(station) {
    /*
     * Given a single BOM station, this determines if this station is of interest
     */
    let isInterested = station.apparent_t > global.gEnvironmentConfig.weatherStations.temperatureGreaterThan;
    return isInterested;
};

const getInterestedStations = function(stations) {
    /*
     * From a given list of BOM stations, return only those that are of interest
     */
    let interestedStations = stations.filter(isInterestedStation);
    console.debug("# of interested stations = %d / %d (%f degrees)", interestedStations.length, stations.length, global.gEnvironmentConfig.weatherStations.temperatureGreaterThan);
    return interestedStations;
};

const sortStationsByTemperatureAscending = function(stations) {
    /*
     * From a given list of BOM stations, sort them by apparent_t, asc
     */
    return stations.sort((a, b) => a.apparent_t - b.apparent_t);
};

const convertBomStationToSimpleStation = function(station) {
    /*
     * From a given BOM station, return "simple" station data.
     * This essentially takes only keeps the pieces of data what we are interested in.
     * The attributes we want to keep are:
     * - name
     * - apparent_t
     * - lat
     * - lon
     */
    return {
        "name": station.name,
        "apparent_t": station.apparent_t,
        "lat": station.lat,
        "lon": station.lon
    };
};

const convertBomStationsToSimpleStations = function(stations) {
    /*
     * From a given list of BOM stations, return a list of "simple" station data.
     * This essentially takes only keeps the pieces of data (from each station).
     * The attributes we want to keep are:
     * - name
     * - apparent_t
     * - lat
     * - lon
     */
    return stations.map(convertBomStationToSimpleStation);
};

exports.isInterestedStation = isInterestedStation;
exports.getInterestedStations = getInterestedStations;
exports.convertBomStationsToSimpleStations = convertBomStationsToSimpleStations;
exports.sortStationsByTemperatureAscending = sortStationsByTemperatureAscending;
