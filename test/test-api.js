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

describe("/config Test", () => {
    describe("/GET /config", () => {
        it("it should return global.gEnvironmentConfig", (done) => {
            chai.request(app)
                .get("/config")
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a("object");
                    (res.body).should.jsonEqual(global.gEnvironmentConfig);
                    done();
                });
        });
    });
});

describe("BOM Successful Test", () => {
    beforeEach(() => {
        /*
         * Setup the BOM mock responses
         * "url": "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json",
         */
        this.bomNock = nock('http://www.bom.gov.au')
            .get('/fwo/IDN60801/IDN60801.95765.json')
            .reply(200, bomResponse200);
//        nock.disableNetConnect();
    });
    afterEach(() => {
        if(!nock.isDone()) {
//            this.test.error(new Error('Not all nock interceptors were used!'));
            assert.fail('Not all nock interceptors were used!');
        }
        nock.cleanAll();
    });
    after(() => {
        nock.restore();
    });

    describe("/GET /bom/raw", () => {
        it("It should return the raw BOM response ", (done) => {
            chai.request(app)
                .get("/bom/raw")
                .end((err, res) => {
                    expect(this.bomNock).to.have.been.requested;
                    (res).should.have.status(200);
                    (res.body).should.be.a("object");
                    (res.body.observations.data.length).should.be.eql(152);
                    done();
                });
         });
    });


    describe("/GET /", () => {
        it("it should return interested BOM stations", (done) => {
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
});

