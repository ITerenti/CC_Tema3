import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd'
import './styles.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const SignInPage = () => {
    const [formRef] = Form.useForm();
    const [token, setToken] = useCookies(['whatsNearMeToken']);
    const navigate = useNavigate();

    const submitForm = () => {
        formRef.validateFields().then((values) => {
            setToken("whatsNearMeToken", values.email);
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
                </div>
            </Form>

            <div className="sign-up-form-footer">
                <button className="submit-button" onClick={submitForm}>Sign In</button>
            </div>
            <div className="sign-up-form-footer">
                Don't have an account? <a href='/sign-up'>Sign Up.</a>
            </div>
        </div>
    </div>)
}