var express = require('express');
var mongoose = require('../../spider/mongoose');
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

module.exports = {
    getRouter: function() {
        var router = express.Router();
        router.
            use('/getUserInfo', handleGetUserInfo);
        return router;
    }
}