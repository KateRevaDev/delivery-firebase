import { useNavigate } from "react-router-dom";
import Layout from "../containers/Layout";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as sagaActions from "../../saga/actions";
import { bindActionCreators } from "@reduxjs/toolkit";

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { registerUser } = bindActionCreators(sagaActions, dispatch);

    const onSubmit = data => {
        console.log(data);
        registerUser({...data, userId: '1'});
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Login</Form.Label>
                    <Form.Control {...register("login", { required: true })} placeholder="Your login" />
                    {errors.login && <span>This field is required</span>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password", { required: true })} type="password" placeholder="Your password" />
                    {errors.password && <span>This field is required</span>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control {...register("confirmPassword", { required: true })} type="password" placeholder="Confirm password" />
                    {errors.confirmPassword && <span>This field is required</span>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register("email", { required: true })} placeholder="Your email" />
                    {errors.email && <span>This field is required</span>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control {...register("name")} placeholder="Your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control {...register("address")} placeholder="Your address" />
                </Form.Group>
                <Button type="submit" variant="outline-dark">Sign Up</Button>
            </Form>
        </Layout>
    );
}

export default SignUp;
