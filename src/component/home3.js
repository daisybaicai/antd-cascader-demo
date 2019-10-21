import React from 'react';
import { Form, Button, Select, Cascader } from 'antd';
import  level1data from './assets/level1data.json';
import  level2data from './assets/level2data.json';
import  level3data from './assets/level3data.json';

const { Option } = Select;

class antdForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', fieldsValue);
        });
    };


    /**
     * @param type  省/市/区
     */
    switchItem = (type) => {
        let leveldata = level1data;
        switch (type) {
            case 'province':
                leveldata = level1data;
                break;
            case 'city':
                leveldata = level2data;
                break;
            case 'district':
                leveldata = level3data;
                break;
            default:
                leveldata = level1data;
                break;
        }
        return (
            <Cascader
                options={leveldata}
                placeholder="选择Cascader地址"
                style={{ width: 300 }}
            />
        );
    }

    onChange = () => {
        const { form: { setFieldsValue } } = this.props;
        setFieldsValue({ 'alldata': null });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 14 },
            },
        };
        return (
            <>
            <h1 style={{textAlign: "center"}}>三级联动</h1>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label='几级联动' {...formItemLayout}>
                    {getFieldDecorator('level', {
                        rules: [
                            { required: true, message: 'level不能为空' }
                        ],
                        initialValue: "province",
                    })(
                        <Select placeholder='几级联动' onChange={this.onChange}>
                            <Option value="province">一级</Option>
                            <Option value="city">二级</Option>
                            <Option value="district">三级</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='选择省市区:' {...formItemLayout}>
                    {getFieldDecorator('alldata', {
                        rules: [
                            { required: true, message: '选择省市区不能为空' }
                        ],
                        initialValue: ['浙江省']
                    })(
                        this.switchItem(getFieldValue('level'))
                    )}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                     </Button>
                </Form.Item>
            </Form>
            </>
        );
    }
}

const antdFormshow = Form.create({ name: 'antdForm' })(antdForm);

export default antdFormshow;