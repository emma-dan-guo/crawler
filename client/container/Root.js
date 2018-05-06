import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Layout, Menu} from 'antd';

const {
    Header,
    Content,
    Sider
} = Layout;


class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout > 
                    <Header className = "header" >
                        <div className = "logo" / >
                        <Menu theme = "dark" mode = "horizontal">
                            <Menu.Item key = "1" > nav 1 </Menu.Item>
                            <Menu.Item key = "2" > nav 2 </Menu.Item>
                            <Menu.Item key = "3" > nav 3 </Menu.Item>
                        </Menu>
                    </Header>
                </Layout>
            </div>
        );
    }
}

export default Root;