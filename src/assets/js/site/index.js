class es6class {
    constructor() {
        console.log('awesome!');
    }
}

var hi = new es6class();


import { test } from './es6module';
console.log(test);


var $ = require('jquery');
console.log($("html"));
