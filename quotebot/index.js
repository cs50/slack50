
// dependencies
var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var request = require('request');
var mongodb = require('mongodb');
var assert = require('assert');

// initialize mongoose and connect
// NOTE: changed the URL to an environmental variable
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var db = mongoose.connection;

// create schema reference
var quoteschema = mongoose.Schema (
{
    name      : String,
    quote     : String
});

// compile schema into model
var Quote = mongoose.model('quotes', quoteschema);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

// this shows up on the deployed heroku webstite
app.get('/', function(req, res)
{
    res.send('It works!');
});

app.post('/post', function(req, res)
{
    var command = req.body.text;
    // if second word is add, let's add a quote!
    if (command.match(/^add/) != null) 
    {
        var name = command.split(' ')[1].toLowerCase();
        var quote = command.split(' ').slice(2).join(' ');
        
        // create new quote document
        var newquote = new Quote({ name: name, quote: quote});
        console.log(newquote.name);
    
        // save new quote to database
        newquote.save(function(err, newquote) 
        {
            if (err) return console.error(err);
        });
    
        // create string that slackbot prints in channel
        var body = 
        {
            response_type: "in_channel",
            text: name[0].toUpperCase() + name.slice(1).toLowerCase() + "'s quote has been added!"
        };
        // send to channel, in response to /quotelist add <name> <quote>
        res.send(body);
    }
    
    // looking for a person's existing quotes
    else 
    {
        var name = command.toLowerCase();
        // find quotes in the database that correlate with that name
        Quote.find({"name" : name}, function (err, quotearray)
        {
            if (err) 
                return console.error(err);
            // if no entries with that name
            if (quotearray.length == 0)
            {
                var body = 
                {
                    response_type: "in_channel",
                    text: name + " has no quotes!"
                };
            }
            else
            {
                // pick a random quote from available, print
                quotes = quotearray;
                var body = 
                {
                    response_type: "in_channel",
                    text: '"' + quotes[Math.floor(Math.random() * quotes.length)].quote.replace(/^\"/, '').replace(/\"$/, '') + '" -' + name[0].toUpperCase() + name.slice(1).toLowerCase()
                };
            }
            // send message to channel with quote and author
            res.send(body);
        });
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
