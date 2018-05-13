import React, {Component} from 'react';
import propTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {Layout, Menu, AutoComplete} from 'antd';

import HouseChoose from './HouseChoose';
import HousePredict from './HousePredict';
import '../constant/css/root.less';

const {
    Header,
    Content
} = Layout;
const MenuItem = Menu.Item;

const styles = {
    menu: {
        background: '#27303E',
        marginBottom: '20px'
    },
    wrapper: {
        background: '#f9f9f9',
    },
    content: {
        margin: '0px 30px',
        minHeight: '100vh',
    }

}

const Home1 = () => (
    <div>这里是home2</div>
)

const Home2 = () => (
    <div>这里是home3</div>
)

class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentPath = window.location.pathname.split('/')[1] || 'home';
        return (
            <div style={styles.wrapper}>
                <Router>
                        <div>
                            <div style={styles.menu}>
                                <Menu
                                    selectedKeys={[currentPath]}
                                    mode="horizontal"
                                    style={{ lineHeight: '40px', color: 'white', width: 1200, margin: '0 auto', background: '#27303E', position: 'relative', color: '', borderBottom: '1px solid #27303E'}}
                                >
                                    <Link to = '/'> <div className = 'nav-logo' > </div></Link >
                                    <MenuItem key="home">
                                        <Link to = '/' key="home"> 房源选择 </Link>
                                    </MenuItem>
                                    <MenuItem key="analysis">
                                        <Link to = "/analysis" key="analysis"> 房源预测 </Link>
                                    </MenuItem>
                                    <MenuItem key="help">
                                        <Link to = "/help" key="help"> 帮助 </Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div style={styles.content}>
                                <Route exact path="/" component={HouseChoose} />
                                <Route path="/analysis" component={HousePredict} />
                                <Route path="/help" component={Home2} />
                            </div>
                        </div>
                </Router>
            </div>
        );
    }
}

export default Root;