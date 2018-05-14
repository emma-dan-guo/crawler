var express = require('express');

const mockList = [
    {key: 0, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 1, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 2, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 3, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 4, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 5, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 6, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
    {key: 7, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
]

function handleGetUserInfo(req, res) {
    console.log('req-----> 请求接收成功', req.body);
    res.json({
        message: 'success',
        data: {
            tableList: mockList,
        }
    });
}

module.exports = {
    getRouter: function() {
        var router = express.Router();
        router.
            use('/getUserInfo', handleGetUserInfo);
        return router;
    }
}