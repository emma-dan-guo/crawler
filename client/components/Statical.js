import React from 'react';
import PropTypes from 'prop-types';
import {
    Tabs
} from 'antd';
import {Chart, Geom, Axis, Tooltip } from 'bizCharts';
import util from '../../util/util';
import { div } from 'gl-matrix/src/gl-matrix/vec3';
import _ from 'lodash';

const TabsPane = Tabs.TabPane;

class Statical extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {tableList} = this.props;
        tableList.map(v => {
            var mapAreas = {
                'chaoyang': '朝阳',
                'erdao': '二道',
                'nanguan': '南关',
                'kuancheng': '宽城',
                'lvyuan': '绿园',
                'shuangyang': '双阳',
                'jiutai': '九台'
            }
            v['areas'] = mapAreas[v.areas] || '其他';
            return v;
        })
        if (tableList.length > 0) {
             var areas = _.groupBy(tableList, function (item) {
                 return item.areas;
             });
             console.log('areas', areas);
             var data = [];
             Object.keys(areas).forEach(key => {
                 data.push({
                     '区域': key,
                     '房源': _.meanBy(areas[key], 'price'),
                 });
             });
        }
        return (
            <Tabs>
                <TabsPane tab="整体分析" key="statical">
                    <Chart height={400} data={data} forceFit>
                        <Axis name="区域" />
                        <Axis name="房源" />
                        <Tooltip />
                        <Geom type="interval" position="区域*房源" />
                    </Chart>
                </TabsPane>
            </Tabs>
        )
    }
}
export default Statical;