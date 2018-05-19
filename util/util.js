function handleDirectionMap(val) {
    var mapDirectionToObj = {'南': 2, '北': 3, '东': 1, '西': 4 };
    var tmp = val.split('');
    return mapDirectionToObj[tmp[0]];
}

function handleMethodsMap(val) {
    if(val.indexOf('合租') > -1) {
        return 2;
    } else if(val.indexOf('整租') > -1) {
        return 1;
    }
    return 0;
}

module.exports = {
    flatten: function flatten(arr) {
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                res = res.concat(flatten(arr[i]));
            } else {
                res.push(arr[i]);
            }
        }
        return res;
    },
    transFormData: function(arr) { // 将数据处理成想要的形式
        var result = arr.map((item, index) => {
            console.log('item', item);
            var mapAreasToObj = {'朝阳': 5, '二道': 1, '南关': 2, '宽城': 3, '绿园': 4, '双阳': 6, '九台': 7};
            return {
                _id: item.url,
                date: new Date().getTime(),
                areas: mapAreasToObj[item.areas] || 0,
                square: Number.parseInt(item.square) || 'error',
                methods: handleMethodsMap([item.methods]) || 0, // 租赁方式: 0表示无，1表示整租，2表示合租
                price: Number.parseInt(item['price']) || 'error', // 价格
                direction: handleDirectionMap(item.direction) || 0, // 朝向：0表示不限，其他朝向映射看上面
                type: item.type,
                houseAreas: item.houseAreas,
                desc: item.desc || '',
            };
        });
        return result;
    },
};