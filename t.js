///////////PORT FREEING ISSUE///////////////
const { exec } = require('child_process');
exec('fuser -k 8081/tcp', (err, stdout, stderr) => {
    if (err) {
        console.log("PORT 8081 IS FREE");
    } else {
        console.log("PORT 8081 IS NOT FREE");
        return;
    }
});
///////////END - PORT FREEING ISSUE//////////
sortBy = require('sort-array')
var express = require('express');//
var bodyParser = require('body-parser');
var app = express();
////////////////////////////////////////////
var lda = require('lda');
var fs = require('fs');
var text = '';
app.use(bodyParser.urlencoded({
    extended: true
}));
// https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/           added this firefox extension for CROS resolution

////////////// GLOBAL VARIBLE //////////////
function FileName() { }
FileName.fileName = []; //  EMPTY ARRAY
FileName.count = 0;
////////////////////////////////////////////

app.post('/', function (req, res) {
    //console.log("Got a POST request for the homepage");
    //console.dir('QUERY => ' + req.body["data"]);
    var search_term = req.body["data"];
    files = fs.readdirSync('../LDA_TOPIC_MODELLING/DOCUMENTstorage/');
    files.forEach(function (f) {
        data = fs.readFileSync('../LDA_TOPIC_MODELLING/DOCUMENTstorage/' + f, 'utf8');
        text = data;
        // Extract sentences.
        var documents = text.match(/[^\.!\?]+[\.!\?]+/g);
        // Run LDA to get terms for n topics (x terms each).
        var result = lda(documents, 1, 5);
        // For each topic.
        for (var i in result) {
            var row = result[i];
            console.log("RetrievedFrom FILE:" + f);
            console.log(row[0].term + ' ' + row[1].term + ' ' + row[2].term + ' ' + row[3].term + ' ' + row[4].term);
            // Look For each term to be matched with
            if (row[0].term === search_term || row[1].term === search_term ||
                row[2].term === search_term || row[3].term === search_term ||
                row[4].term === search_term) {
                /**
                 * Collecting Search File Information
                 */
                for (var j in row) {
                    var term = row[j];
                    if (search_term === term.term) {
                        var fileinfo = {
                            name: '' + f + '',
                            probability: + term.probability
                        };
                        FileName.fileName[FileName.count] = fileinfo;
                        FileName.count++;
                        break;
                    }
                }            
            }
        }
    });

    sortBy(FileName.fileName, 'probability'); // SORT FILE USING PROBABILITY OF RELEVANCE

    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(FileName.fileName));
    //console.log(JSON.stringify(FileName.fileName));
    FileName.fileName = [];
    FileName.count = 0;
    res.end();

});

app.post('/searchhint', function (req, res) {
    var str = '';
    //function getFile(callback) {
    files = fs.readdirSync('../LDA_TOPIC_MODELLING/DOCUMENTstorage/');
    // if (err) return;
    files.forEach(function (f) {
        data = fs.readFileSync('../LDA_TOPIC_MODELLING/DOCUMENTstorage/' + f, 'utf8');
        //   if (err) throw err;
        text = data;
        // Extract sentences.
        var documents = text.match(/[^\.!\?]+[\.!\?]+/g);
        // Run LDA to get terms for n topics (x terms each).
        var result = lda(documents, 1, 5);
        // For each topic.
        for (var i in result) {
            var row = result[i];
            console.log("RetrievedFrom FILE:" + f);
            console.log(row[0].term + ' ' + row[1].term + ' ' + row[2].term + ' ' + row[3].term + ' ' + row[4].term);
            str += row[0].term + ' ' + row[1].term + ' ' + row[2].term + ' ' + row[3].term + ' ' + row[4].term + ' ';
        }
    });

    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(str);
    str = '';
    res.end();
});

app.listen(8081);