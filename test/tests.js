var assert = require('chai').assert;
var express = require('express');
var fs = require('fs');
var status = require('http-status');
var wagner = require('wagner-core');

describe('pawdiary.server', function () {
    describe('routes', function () {
        require('./routes/tests');
    });
})
