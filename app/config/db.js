var mongoose = require('mongoose'),
    Sequelize = require('sequelize'),
    fs = require('fs'),
    db = {};

var mongo_uri = 'mongodb://localhost:27017/myproject'
var mysql_uri = 'mysql://api:123qwe@localhost:3306/node';

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

// Create a new conntection to MongoDB server
mongoose.connect(mongo_uri);
// Create a new connection to MySQL server
var sequelize = new Sequelize(mysql_uri, { operatorsAliases: operatorsAliases, logging: false });

fs.readdirSync(__dirname + '/../models/mysql/')
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize.import(__dirname + '/../models/mysql/' + file);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

fs.readdirSync(__dirname + '/../models/mongodb/')
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = require(__dirname + '/../models/mongodb/' + file);
        db[model.modelName] = model;
    });

db.sequelize = sequelize;
db.mongoose = mongoose.connection;

module.exports = db;