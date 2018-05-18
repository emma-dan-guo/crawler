var express = require('express');
var mongoose = require('../../spider/mongoose');

async function handleGetUserInfo(req, res) {
    console.log('req', req.body);
    if(JSON.stringify(req.body.formParams) !== '{}') {
        console.log('筛选条件');
    } else {
        var responese = await mongoose.find();
        console.log('responese', responese);
        response = responese.map(v => {
            return v['key'] = v.url;
        });
        res.json({
            message: 'success',
            data: {
                tableList: responese,
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