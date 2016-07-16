var assert = require('chai').assert;
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var wagner = require('wagner-core');

var app;
var server;
before(function () {
    server = require('../server/bin/www');
    console.log("starting server ");
});

after(function () {
    server.close();
    console.log("stopping server ");
});
