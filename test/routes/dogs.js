var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');
var supertest = require('supertest');

require('../server.start');

describe('error handling', function () {
    it('not logged in', function (done) {
        superagent.get('http://localhost:3000/api/v1/dogs').send({}).end(
            function (error, res) {
                should.exist(error);
                should.not.equal(error.status, undefined);
                assert.equal(error.status, status.UNAUTHORIZED);
                done();
            });
    });
    it('user not logged in', function (done) {
        var agent1 = superagent.agent(); 

        agent1
            .get('http://localhost:3000/auth/facebook')
            .set('Accept', 'application/json')
            .send({ email: 'zzoygqt_martinazziescu_1463977504@tfbnw.net', pass:'tester1' })
            .end(function (err, res) {
                should.not.exist(err);
                should.have.status(err.status, 401);
                should.exist(res.headers['set-cookie']);
                done();
            });
    });
});

describe('good', function () {
    before(function (done) {
        done();
    });
    it('POST');
    it('GET');
    it('DELETE');
});
