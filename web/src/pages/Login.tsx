import React from 'react';
import { gql, useMutation } from '@apollo/client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import "../styles/login.css"

const LOGIN_MUTATION = gql`
mutation login($email: String!, $password: String!){
    login( email: $email, password: $password ){
            token
        }
    }
`
interface LoginValues {
    email: string
    password: string
}

function Login() {
    const history = useHistory()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [login, { data }] = useMutation(LOGIN_MUTATION)

    const initialValues: LoginValues = {
        email: "",
        password: ""
    }


    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email Required"),
        password: Yup.string().max(20, "Must be 20 characters or less").required("Password Required"),
    })

    return (
        <div className="container">
            <h3>Log in to Desktop</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const response = await login({
                        variables: values
                    })
                    localStorage.setItem("token", response.data.login.token)
                    setSubmitting(false)
                    history.push("/")
                }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage name="email" component={"div"} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={"div"} />
                    <button type="submit" className="login-button">
                        <span>Login</span>
                    </button>
                </Form>
            </Formik>
            <div className="register">
                <h4>No account yet?</h4>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;