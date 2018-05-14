import React from 'react';
import PropTypes from 'prop-types';

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
            {title: '日期', key: 'date', dataIndex: 'date'},
            {title: '方式', key: 'methods', dataIndex: 'methods'},
            {title: '价格', key: 'price', dataIndex: 'price'},
            {title: '区域', key: 'areas', dataIndex: 'areas'},
            {title: 'href链接', key: 'href', dataIndex: 'href'},
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
                    message.success('操作成功');
                    this.setState({
                        tableList: json.data.tableList,
                    })
                } else {
                    json.message && message.error('操作失败: ' + json.message + '; 请稍后重试');
                }
            });
        }).catch((e) => {
            message.error('操作失败!' + e);
        });
    }


    renderDataSource() {
        return [
            {key: 0, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 1, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 2, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 3, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 4, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 5, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 6, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
            {key: 7, date: '2018-5-4', price: '3500', direction: '朝南', areas: '海淀区', href: 'xxxxxxx', methods: '朝南'},
        ]
    }

    render() {
        const columns = this.getColumns();
        const dataSource = this.renderDataSource();
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