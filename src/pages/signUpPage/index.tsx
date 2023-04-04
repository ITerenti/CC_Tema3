import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd'
import './styles.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
    const [formRef] = Form.useForm();
    const [token] = useCookies(['whatsNearMeToken']);
    const navigate = useNavigate();

    const submitForm = () => {
        formRef.validateFields().then((values) => {
            navigate('/sign-in')
        })
    }

    useEffect(() => {
        if (token && token.whatsNearMeToken) {
            navigate('/homepage')
        }
    }, [token])

    return (<div className="sign-up-page">
        <div className="sign-up-form-container">
            <h3>Create an account</h3>
            <Form className="sign-up-form" autoComplete={'false'} validateTrigger={'onBlur'} form={formRef}>

                <div className="form-input-field">
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true, message: 'This field is required'
                        }, {
                            type: 'email', message: 'Please enter a valid email address'
                        }]}>
                        <Input className="input-field" placeholder="Enter your email" />
                    </Form.Item>
                </div>
                <div className="form-input-field">
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true, message: 'This field is required'
                        },
                        {
                            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{10,100}$/,
                            message: `The password should match the description below.`
                        }]}>
                        <Input className="input-field" type='password' placeholder="Enter your password" />
                    </Form.Item>
                    <p className="input-field-suggestion">
                        Must contain between 10 and 20 characters, at least one uppercase letter, one number and one
                        special character
                    </p>
                </div>
                <div className="form-input-field">
                    <Form.Item
                        name="passwordConfirm"
                        rules={[{
                            required: true, message: 'This field is required'
                        },
                        {
                            validator: (_, value) => {
                                if (value === formRef.getFieldsValue().password) {
                                    return Promise.resolve()
                                }
                                return Promise.reject('The passwords do not match')
                            }
                        }]}
                    >
                        <Input className="input-field" type='password' placeholder='Confirm your password' />
                    </Form.Item>
                </div>
            </Form>

            <div className="sign-up-form-footer">
                <button className="submit-button" onClick={submitForm}>Sign up</button>
            </div>
            <div className="sign-up-form-footer">
                Already have an account? <a href='/sign-in'>Sign In.</a>
            </div>
        </div>
    </div>)
}