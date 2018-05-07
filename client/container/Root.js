import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Layout, Menu} from 'antd';

const {
    Header,
    Content
} = Layout;

const styles = {
    header: {
       height: 50,
    },
}


class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout > 
                    <Header style={styles.header} >
                        <Menu theme = "dark" mode = "horizontal">
                            <Menu.Item key = "1" >房源选择</Menu.Item>
                            <Menu.Item key = "2" > 房源预测</Menu.Item>
                            <Menu.Item key = "3" > 帮助中心</Menu.Item>
                        </Menu>
                    </Header>
                    <Content>

                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Root;