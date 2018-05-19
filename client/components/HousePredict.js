import React from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
} from 'antd';

const TabsPane = Tabs.TabPane;

class HousePredict extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tabs>
                    <TabsPane tab="房源预测" key="predict">
                        <div>
                            hello world
                        </div>
                    </TabsPane>
                </Tabs>
            </div>
        )
    }
}

export default HousePredict;