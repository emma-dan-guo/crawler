function handleDirectionMap(val) {
    var mapDirectionToObj = {'南': 'south', '北': 'north', '东': 'east', '西': 'west' };
    var tmp = val.split('');
    return mapDirectionToObj[tmp[0]];
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
            var mapMethodToObj = {'整租': '1', '合租': '2'};
            var mapAreasToObj = {'朝阳': 'chaoyang', '二道': 'erdao', '南关': 'nanguan', '宽城': 'kuancheng', '绿园': 'lvyuan', '双阳': 'shuangyang', '九台': 'jiutai'};
            return {
                _id: item.url,
                date: new Date().getTime(),
                areas: mapAreasToObj[item.areas] || 'others',
                square: Number.parseInt(item.square) || '',
                methods: mapMethodToObj[item.methods] || 'buxian', // 租赁方式
                price: Number.parseInt(item['price']) || '', // 价格
                direction: handleDirectionMap(item.direction) || 'buxian', // 朝向
                type: item.type,
                houseAreas: item.houseAreas || 'buxian',
            };
        });
        return result;
    }
};