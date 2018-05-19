var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crawler');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接mongodb失败。'));
db.once('open', function () {
    console.warn('连接mongodb成功。');
});
//创建数据库

var HouseSchema = mongoose.Schema({
    _id: String,
    date: String,
    areas: String,
    price: Number,
    square: String,
    houseAreas: String,
    methods: String,
    direction: String,
    type: String,
    desc: String
});
//创建表
var HouseCol = mongoose.model('house', HouseSchema);
var result = {
    async add(item) {
        var findItem = await this.find({
            _id: item._id
        });
        if (findItem.length > 0) {
            //如果状态变更执行更新操作
            if (findItem[0].status != item.status) {
                this.update(item);
                return item;
            } else {
                return false;
            }
        }
        var house = new HouseCol(item);
        house.save(function (err) {
            if (err) {
                console.error(err);
                return false;
            }
        });
        return item;
    },
    async addMany(array) {
        HouseCol.create(array, function (err) {
            err && console.log('批量插入失败。');
        });
    },
    update(item) {
        HouseCol.findOneAndUpdate({
            _id: item._id
        }, item, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    find(query) {
        var result = HouseCol.find(query, function (err, house) {
            if (err) return console.error(err);
            return house;
        });
        return result;
    }
};

module.exports = result;
