var  http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var EventEmitter = require("events").EventEmitter;
var STATUS_CODES = http.STATUS_CODES;

// scraper

function Scraper (url);{
this.url = url;

this.init();
}


util.inherits(Scraper, EventEmitter);


// Initialize Scraper

Scraper.prototype.init =function(){
    var model;
    var self =this;

    self.on('loaded', function(html){
        model = self.parsePage(html);
        self.emit('complete', model);
    });

    self.loadWebPage();

};


Scraper.prototype.loadWebPage = function(){
    var self = this;
    console.log('\n\nLoading' + website);


    http.get(self.url, function (res){
        var body = "";

        if (res.statusCode !== 200) {
            return self.emit('error', STATUS_CODES[res.statusCode]);

        }

        res.on('data', function (chunk){
            body += chunk;
        });

        res.on('end', function(){
            self.emit('loaded',body);
        });
    })
    .on('error', function (err){
        self.emit('error', err);
    });

};


// parse htm and return object

Scraper.prototype.parsePage =function(html){
    var $ = cheerio.load(html);

    var  headline =$('#headline').text();
    var summary = $("#summary").text();


    var model = {
        title: headline.trim().split('\n'),
        summary:summary.trim().split('\n'),
        url: this.url

    };
return model;

};

module.exports = Scraper;


