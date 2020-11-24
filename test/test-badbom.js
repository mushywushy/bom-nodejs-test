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
let badapp = require("../index").app;

/*
 * BOM Responses to mock
 */
const bomResponse503 = require('./bomResponse503');

describe("BOM Unsuccessful Test", () => {
    beforeEach(() => {
        /*
         * Setup the BOM mock responses
         * "url": "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json",
         */
        this.bomNock = nock('http://www.bom.gov.au')
            .get('/fwo/IDN60801/IDN60801.95765.json')
            .reply(503, bomResponse503);
//        nock.disableNetConnect();
    });
    afterEach(() => {
        if(!nock.isDone()) {
            //this.test.error(new Error('Not all nock interceptors were used!'));
            assert.fail('Not all nock interceptors were used!');
        }
        nock.cleanAll();
    });
    after(() => {
        nock.restore();
    });

    describe("/GET / when BOM service is down", () => {
        it("It should return a 503 error", (done) => {
            this.bomNock = nock('http://www.bom.gov.au')
                .get('/fwo/IDN60800/IDN60801.95765.json')
                .reply(502, bomResponse503);

            chai.request(badapp)
                .get("/")
                .end((err, res) => {
//                    expect(this.bomNock).to.have.been.requested;
                    console.log(`res = ${res}`);
                    (res).should.have.status(503);
                    (res.body).should.be.a("object");
                    (res.body.error).should.contain("Service Unavailable");
                    done();
                });
        });
    });
});
