import React from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Row,
    Form,
    Radio,
    Select,
    Col,
    Button,
    Input
} from 'antd';

const TabsPane = Tabs.TabPane;
const FormItem = Form.Item;

const styles = {
    filter: {
        background: '#fff',
        marginTop: '20px',
        padding: '10px 0',
    },
    formItem: {
        width: 160,
    },
    filterNav: {
        borderBottom: '1px solid gray',
    },
    tabButton: {
        background: '#6D9BF4',
        borderRadius: '4px',
        width: '88px',
        height: '27px',
        color: '#fff',
        lineHeight: '27px',
        textAlign: 'center',
    }, 
    resultWrapper: {
        marginRight: '10px',
        marginTop: 10,
    }
}

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16,
        offset: 1
    },
};

class HousePredict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            predicResult: "预测结果",
        }
    }

    renderFormList(formList) {
        let {getFieldDecorator} = this.props.form;
        return formList.map(val => {
            switch (val.mode) {
                case ('select'): {
                    return (
                        <Col span={4} key={val.key}>
                            <FormItem label={val.label}  {...formItemLayout} key={val.key}>
                                {getFieldDecorator(val.key, {
                                    initialValue: val.value[0].key,
                                    rules: [
                                        {required: val.required || false, message: 'required'},
                                    ],
                                })(
                                    <Select name = {val.name} key = {val.name} style={styles.formItem}>
                                        {val.value.map(v => (<Option key={v.key} value={v.key}>{v.value}</Option>))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    )
                }
                case ("radio"): {
                    return (
                        <Col span={18}>
                            <FormItem label={val.label} wrapperCol={{span: 22}} labelCol={{span: 1}} key={val.key}>
                                <Radio.Group defaultValue={0} style={{marginLeft: 20}}>
                                    {
                                        val.value.map(v => <Radio.Button value={v.key} key={v.key}>{v.value}</Radio.Button>)
                                    }
                                </Radio.Group>
                            </FormItem>
                        </Col>
                    )
                }
                case('input'): {
                    return (
                       <Col span={8}>
                            <FormItem label={val.label} wrapperCol={{span: 8}} labelCol={{span: 4}} key={val.key}>
                                <Input / >
                            </FormItem>
                            {val.desc && <span>{val.desc}</span>}
                       </Col>
                    )
                }
                case('button'): {
                    return (
                        <Col span={4} style={{height: 63}}>
                            <Button type='primary' style={styles.tabButton} onClick={() => this.handlePredictClick()}>
                                预测
                            </Button>
                        </Col>
                    );
                }
                case('result'): {
                    return (
                        <Col span={4} offset={6}>
                            <span style={{marginRight: 10}}>预测结果：</span>
                            <span>{this.state.predicResult}</span>
                        </Col>
                    )
                }
            }
        })
    }

    handlePredictClick() {
        console.log('预测预测');
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formList = [
            {key: 'areas', label: '区域', mode: 'radio', value: [
                    {key: 5, value: '朝阳'},
                    {key: 1, value: '二道'},
                    {key: 2, value: '南关'},
                    {key: 3, value: '宽城'},
                    {key: 4, value: '绿园'},
                    {key: 6, value: '双阳'},
                    {key: 7, value: '九台'}
                ]
            }, {
                key: 'predictButton', mode: 'button', 
            }, {key: 'direction', label: '朝向', mode: 'select', value: [
                    {key: 0, value: '不限'},
                    {key: 2, value: '朝南'},
                    {key: 4, value: '朝西'},
                    {key: 1, value: '朝东'},
                    {key: 3, value: '朝北'},
                ]
            }, {
                key: 'square', label: '面积',mode: 'input',
            }, {
                key: 'predictResult', mode: 'result'
            }
        ];
        return (
            <div>
                <Tabs>
                    <TabsPane tab="房源预测" key="predict">
                        <Row>
                            {this.renderFormList(formList)}
                        </Row>
                    </TabsPane>
                </Tabs>
            </div>
        )
    }
}

HousePredict = Form.create()(HousePredict);

export default HousePredict;