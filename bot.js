var Model = require('./model');
var Scraper = require('./scraper');
var Pages = [];

function generateUrls(limit);{
var url = 'https://www.dallasnews.com/';
var urls = [];
var = i;

for (i=1; i < limit; i++){
    urls.push(url + i);
}

return urls;

}


Pages = generateUrls(25000);

function wizard(){
    if (!Pages.length){
        return console.log('Done');

    }
    var url = Pages.pop();
    var scraper = new Scraper(url);
    var model;

    console.log('request Left: ' + Pages.length);

    scraper.on('error', function(error){
        console.log(error);
        wizard();
    });

    scraper.on('complete', funciton (listing){
        model = new Model(listing);

        model.save(function(err){
            if(err){
                console.log('Database err saving: ' + url);
            }
        });

        wizard();
    });
}
var numberOfParallelRequests = 20;
for (var i = 0; i < numberOfParallelRequests; i++) {
  wizard();
}
