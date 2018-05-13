var express = require('express');

function handleGetUserInfo(req, res) {
    console.log('req-----> 请求接收成功', req);
}

module.exports = {
    getRouter: function() {
        var router = express.Router();
        router.
            use('/getUserInfo', handleGetUserInfo);
        return router;
    }
}