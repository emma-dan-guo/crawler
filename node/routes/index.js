var express = require('express');
var mongoose = require('../../spider/mongoose');
var utils = require('../../util/util');
var _ = require('lodash');

async function handleGetUserInfo(req, res) {
    console.log('req', req.body);
    if(JSON.stringify(req.body.formParams) !== '{}') {
        console.log('筛选条件');
    } else {
        var responese = await mongoose.find();
        response = responese.map(v => {
            return v['key'] = v.url;
        });
        var tmpRes = _.groupBy(responese, function(item) {
            return item.methods;
        });
        Array.prototype.push.apply(tmpRes['2'], tmpRes['1']);
        Array.prototype.push.apply(tmpRes['2'], tmpRes['0']);
        res.json({
            message: 'success',
            data: {
                tableList: tmpRes['2'],
            }
        })
    }
}

async function handleFilterInfo(req, res) {
    var formParams = req.body.formParams;
    var priceArr = ['', '0-1000', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-#'];
    if(priceArr[formParams.price]) {
        var priceStr = priceArr[formParams.price];
        var minPrice = priceArr.split('-')[0];
        var maxPrice = priceArr.split('-')[1];
    }
    var tmp = {$gt: minPrice};
    if(maxPrice !== '#') {
        tmp['$lte'] = maxPrice;
    }
    formParams.price = tmp;
    var response = mongoose.find(formParams);
    console.log('response');
}

module.exports = {
    getRouter: function() {
        var router = express.Router();
        router
            .use('/filterInfo', handleFilterInfo)
            .use('/getUserInfo', handleGetUserInfo);
        return router;
    }
}