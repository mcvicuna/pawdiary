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
var FB = require('fb');
const Browser = require('zombie');

server = require('../server.start');

var facebook = 'https://www.facebook.com';
var app_url = 'http://localhost:3000';

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
            .post('https://www.facebook.com/login.php')
            .set('User-Agent',"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36")
            .send({ email: 'zzoygqt_martinazziescu_1463977504@tfbnw.net', pass:'bad pass' })
            .end(function (err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                // console.log('response from facebook:'+JSON.stringify(res.body));
                agent1
                    .get('http://localhost:3000/auth/facebook')
                    .end(function (err, res) {
                        should.not.exist(err);
                         agent1
                            .get('http://localhost:3000/api/v1/dogs').send({})
                            .end(function (err, res) {
                                should.exist(err);
                                done();
                            });    
                    });    
            });
    });
});

describe('good', function () {
    var agent2 = superagent.agent(); 
    const browser = new Browser();
    browser.userAgent = [
			"Mozilla/5.0 (Linux; U; Android 2.2.1; en-ca; LG-P505R Build/FRG83)",
			"AppleWebKit/533.1 (KHTML, like Gecko)",
			"Version/4.0 Mobile Safari/533.1"
    ].join(" ");

    before(function (done) {
        // agent2
        //     .get('https://www.facebook.com/?_fb_noscript=1')
        //     .set('User-Agent',"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36")
        //     .send({})
        //     .end(function (err, res) {
        //         agent2
        //             .post('https://www.facebook.com/login.php')
        //             .set('User-Agent',"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36")
        //             .send({ email: 'zzoygqt_martinazziescu_1463977504@tfbnw.net', pass:'tester1' })
        //             .end(function (err, res) {
        //                 should.not.exist(err);
        //                 res.status.should.equal(200);
        //                 console.log('response from facebook:'+JSON.stringify(res));
        //                 done();
        //             });
        //     });

        done();

    });


    describe('test dogs', function() {
        // before(function(done) {
        //     this.timeout(10000);
        //     agent2
        //         .get('http://localhost:3000/auth/facebook')
        //         .set('User-Agent',"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36")
        //         .send({})
        //         .end(function (err, res) {
        //             should.not.exist(err);
        //             res.status.should.equal(200);
        //             console.log('response from facebook:'+JSON.stringify(res));
        //             done();
        //         });
        // });

        //https://www.facebook.com/dialog/oauth?client_id=1712118032404457&redirect_uri=http://localhost:3000/auth/facebook/callback&response_type=token
        // it('login zombie', function() {
        //     browser.visit('https://www.facebook.com/dialog/oauth?client_id='+wagner.get('Config').facebookClientId+'&redirect_uri=https://www.facebook.com/connect/login_success.html&response_type=code', function(err,brw3) {

        //         should.not.exist(err);
        //         should.exit(brw3);
        //         browser
        //             .fill('email','zzoygqt_martinazziescu_1463977504@tfbnw.net')
        //             .fill('pass','tester1')
        //             .pressButton('login',function(err,brw2){
        //                 brw2.assert.success();
        //                 done();
        //             });
        //         });
        // });

        it('login oauth',function(done) {
            this.timeout(10000);
            agent2
                .get('http://localhost:3000/')
                .set('User-Agent',"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36")
                .send({})
                .end(function (err, res) {
                    should.not.exist(err);
                    res.status.should.equal(200);
                
                    agent2
                        .get('http://localhost:3000/auth/facebook/token?'+
                             'access_token=EAAYVKYsijZBkBANOp8ZBg3oN0QImUlvaSZBgPyEpJzTMGF5AQUVa4mZBK7XbJZB59rdnYjlD1gVexwZAWYGIu5ci7u5oGwQdmTPyCZBPt4OZC4ofBtfUeLh4aVpTXRLwZABI69LuCLGBD8nPUWmHdZAGehuyF4rVVxpMY3Neq8vGQogNZB2UQSQY8pZB')
                        .set('User-Agent',"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36")
                        .send({})
                        .end(function (err, res) {
                            should.not.exist(err);
                            res.status.should.equal(200);
                            agent2
                                .get('http://localhost:3000/api/v1/dogs').send({})
                                .end(function (err, res) {
                                    should.not.exist(err);
                                    done();
                            });    
                        });
                });
        });

        it('POST');
        it('GET');
        // , function (done) {
        //     agent2
        //     .get('http://localhost:3000/api/v1/dogs').send({})
        //     .end(function (err, res) {
        //         should.not.exist(err);
        //         res.status.should.equal(200);
        //         done();
        //         });    
        // });   
        it('DELETE');
    });
});
