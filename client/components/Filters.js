import React from 'react';
import PropTypes from 'prop-types';
import '../constant/css/root.less';

import {
    Row,
    Col,
    Select,
    Form,
    Input,
    Button, Radio, Table, Tabs,
} from 'antd';
const FormItem = Form.Item;
const TabsPane = Tabs.TabPane;

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
        marginRight: '10px',
    }
}

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 18, offset: 1},
};


class Filters extends React.Component {
    constructor(props) {
        super(props);
    }

    renderFormList(formList) {
        let {getFieldDecorator} = this.props.form;
        return formList.map(val => {
            switch (val.mode) {
                case ('select'): {
                    return (
                        <Col span={8} key={val.key}>
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
                        <FormItem label={val.label} wrapperCol={{span: 22}} labelCol={{span: 1}} key={val.key}>
                            <Radio.Group defaultValue="unlimited" style={{marginLeft: 20}}>
                                <Radio.Button value="unlimited">不限</Radio.Button>
                                <Radio.Button value="chaoyang">朝阳区</Radio.Button>
                                <Radio.Button value="nanguan">南关区</Radio.Button>
                                <Radio.Button value="kuancheng">宽城区</Radio.Button>
                                <Radio.Button value="jiutai">九台区</Radio.Button>
                                <Radio.Button value="lvyuan">绿园区</Radio.Button>
                                <Radio.Button value="shuangyang">双阳区</Radio.Button>
                            </Radio.Group>
                        </FormItem>
                    )
                }
            }
        })
    }

    handlePredictClick() {
        let {getInfo, form} = this.props;
        const {getFieldsValue, validateFields} = form;
        validateFields(function (error) {
            if(!error) {
                let formObj = getFieldsValue();
                console.log(formObj);
                getInfo(formObj);
            }
        });
    }
    
    render() {
        const {getFieldDecorator} = this.props.form;
        const formList = [
            {key: 'areas', label: '区域',mode: 'radio', value: [
                    {key: 'name', value: '有待填写'},
                ]
            }, {
                key: 'price', label: '价格', mode: 'select', value: [
                    {key: 0, value: '不限'},
                    {key: 1, value: '1000以下'},
                    {key: 2, value: '1000-2000'},
                    {key: 3, value: '2000-3000'},
                    {key: 4, value: '3000-4000'},
                    {key: 5, value: '4000-5000'},
                    {key: 6, value: '5000以上'},
                ]
            }, {
                key: 'rental', label: '方式', mode: 'select', value: [
                    {key: 0, value: '不限'},
                    {key: 1, value: '整租'},
                    {key: 2, value: '合租'},
                ]
            }, {key: 'direction', label: '朝向', mode: 'select', value: [
                    {key: 'others', value: '不限'},
                    {key: 'south', value: '朝南'},
                    {key: 'west', value: '朝西'},
                    {key: 'east', value: '朝东'},
                    {key: 'north', value: '朝北'},
                ]
            }
        ]
        return(
            <div style={styles.filter}>
                <Tabs tabBarExtraContent={<Button type='primary' style={styles.tabButton} onClick={() => this.handlePredictClick()}>选择</Button>} onTabClick={(val) => this.handleTabClick(val)}>
                    <TabsPane tab="筛选条件" key="condition">
                        <Row>
                            {this.renderFormList(formList)}
                        </Row>
                    </TabsPane>
                </Tabs>
            </div>
        )
    }
}

Filters = Form.create()(Filters);

export default Filters;