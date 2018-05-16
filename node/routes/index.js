var express = require('express');
var mongoose = require('../../spider/mongoose');

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

async function handleGetUserInfo(req, res) {
    console.log('req', req.body);
    if(JSON.stringify(req.body.formParams) !== '{}') {
        console.log('筛选条件');
    } else {
        var responese = await mongoose.find();
        console.log('responese', responese);
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