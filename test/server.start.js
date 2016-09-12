var assert = require('chai').assert;
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var wagner = require('wagner-core');

before(function () {
    exports.server = require('../server/bin/www');
    exports.app = exports.server.app;
    console.log("starting server ");
});

after(function () {
    exports.server.close();
    console.log("stopping server ");
});
