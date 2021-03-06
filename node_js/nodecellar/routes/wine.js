/**
 * Created with JetBrains WebStorm.
 * User: farhan
 * Date: 10/8/13
 * Time: 12:18 AM
 * To change this template use File | Settings | File Templates.
 */

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var serverOptions = {
    'auto_reconnect': true,
    'poolSize': 50,
    'safe':false
};

var server = new Server('localhost', 27017,serverOptions);
db = new Db('winedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }else
    {

        console.log("error"+err);
    }
});

exports.findById = function(req,res){

    var id = req.params.id;
    console.log('Retrieving wine: ' + id);

    db.collection('wines', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
}



exports.findAll = function(req,res)
{
    db.collection('wines',function(err,collection)
    {
        collection.find().toArray(function(err,items){
            res.send(items);
        });

    });
}

exports.addWine = function(req,res)
{
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));

    db.collection('wines', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req,res)
{
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));

    db.collection('wines',function(err,collection)
    {
        collection.update({'_id': new BSON.objectId(id)},wine,{safe:true},function(err,result)
        {
            if(err)
            {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            }
            else
            {
               console.log('' + result + ' document(s) updated');
               res.send(wine);
            }

        });
    });
}

exports.deleteWine = function(req,res)
{
    var id = req._params.id;

    console.log('Deleting wine: ' + id);

    db.collection('wines', function(err,collection)
    {
        collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},function(err,result)
        {
            if(err)
            {
               res.send("error deleting wine");
            }else
            {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var wines = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
        }];

    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });

};