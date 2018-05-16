import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Table,
    message
} from 'antd';

import Filters from '../components/Filters';
import Map from '../components/Map';

const pagination = {
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 50,
    pageSizeOptions: ['200', '100', '50', '30'],
    showTotal(total) {
        return '共' + total + '条 ';
    },
};
const styles = {
    table: {
        background: 'white',
        marginTop: '10px',
        padding: '5px 10px',
    },
    mapWrapper: {
        background: 'white',
        // width: '794px',
        height: '400px',
        marginTop: '10px',
    }
}

class HouseChoose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList: []
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    getColumns() {
        return [
            {title: '日期', key: 'date', dataIndex: 'date', render: function(text) {
                return moment(text).format('YYYY-MM-DD');
            }},
            {title: '方式', key: 'methods', dataIndex: 'methods', render: function(text) {
                return [, '整租', '合租'][text];
            }},
            {title: '价格', key: 'price', dataIndex: 'price'},
            {title: '区域', key: 'areas', dataIndex: 'areas', render: function (text) {
                var mapAreas = {
                    'chaoyang': '朝阳',
                    'erdao': '二道',
                    'nanguan': '南关',
                    'kuancheng': '宽城',
                    'lvyuan': '绿园',
                    'shuangyang': '双阳',
                    'jiutai': '九台'
                }
                return mapAreas[text] || '其他';
            }},
            {title: '面积', key: 'square', dataIndex: 'square', render: function(text) {
                return `${text}平方/米`;
            }},
            {title: '小区', ket: 'houseAreas', dataIndex: 'houseAreas'},
            {title: 'href链接', key: 'url', dataIndex: 'url', render: function(text, record) {
                return <a href={record._id}>{record._id}</a>;
            }},
        ]
    }

    getInfo(formParams={}) {
        fetch('/api/getUserInfo', {
            method: 'post',
            body: JSON.stringify({
                formParams,
            }),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'same-origin',
        }).then((response) => {
            response.json().then(json => {
                if (json.message === 'success') {
                    // message.success('操作成功');
                    this.setState({
                        tableList: json.data.tableList,
                    }, () => {
                        console.log('tableList', this.state.tableList);
                    });
                } else {
                    json.message && message.error('操作失败: ' + json.message + '; 请稍后重试');
                }
            });
        }).catch((e) => {
            message.error('操作失败!' + e);
        });
    }

    render() {
        const columns = this.getColumns();
        const {tableList} = this.state;
        return(
            <div>
                < Filters 
                    getInfo={this.getInfo.bind(this)}
                / >
                <div style={styles.mapWrapper}>
                   <Map tableList={tableList}/>
                </div>
                <div style={styles.table}>
                    <Table bordered columns={columns} dataSource={tableList} pagination={false} pagination={pagination} style={styles.table}></Table>
                </div>
            </div>
        )
    }
}

export default HouseChoose;