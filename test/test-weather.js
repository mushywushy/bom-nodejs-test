/*jshint esversion: 6 */

/*
 * Testing Imports
 */
const nock = require("nock");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiNock = require("chai-nock");
const chaiJsonEqual = require('chai-json-equal');

/*
 * Application Imports
 */
const libWeather = require("../lib/weather");

/*
 * Setup chai
 */
chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiNock);

const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

/*
 * Our application to mock
 */
let app = require("../index").app;

/*
 * BOM Responses to mock
 */
const bomResponse200 = require('./bomResponse200');

describe("lib.weather Tests", () => {

	it("sortStationsByTemperatureAscending should do what it says", async () => {
		let unsortedStations = bomResponse200.observations.data;
		let sortedStations = await libWeather.sortStationsByTemperatureAscending(unsortedStations);

		(unsortedStations.length).should.be.eql(152);
		(sortedStations.length).should.be.eql(152);
		(sortedStations[0].apparent_t).should.be.eql(17.4);
		(sortedStations.slice(-1)[0].apparent_t).should.be.eql(32.8);
	});

	it("convertBomStationsToSimpleStations should return a 4 attribute object (name,apparent_t,lat_lon)", async () => {
		let unsortedStations = bomResponse200.observations.data;
		let simpleStations = await libWeather.convertBomStationsToSimpleStations(unsortedStations);

		(simpleStations.length).should.be.eql(152);
		(Object.keys(simpleStations[0]).length).should.be.eql(4);
	});

		/*
		chai.request(app)
			.get("/")
			.end((err, res) => {
				(res).should.have.status(200);
				(res.body).should.be.a("Array");
				(res.body.length).should.be.eql(115);
				done();
			});
	});
});
	//using a callback function
	it("sortStationsByTemperatureAscending", done => {
    	callToAsyncFunction(input, (result) = {
        	//implement testing logic

        	//call the callback function
        	done()
    	})
	})

	//using promises
	it("should return another output", () => {
    	return callToAsyncFunction(input).then(result => {
        	//implement result testing logic
    	})
	})

	//using async/await
	it("should return a different output", async () => {
    	let result = await callToAsyncFunction(input)
    	//implement testing logic

	})
	*/


});

