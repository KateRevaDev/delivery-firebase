import { bindActionCreators } from "@reduxjs/toolkit";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sagaActions from "../../saga/actions";

const SignIn = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loginUser } = bindActionCreators(sagaActions, dispatch);

    const onSubmit = data => {
        console.log(data);
        loginUser(data);
    };

    console.log(watch("email")); // watch input value by passing the name of it

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email",  { required: true })} placeholder="Your email" />
                {errors.email && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password",  { required: true })} type="password" placeholder="Your password" />
                {errors.password && <span>This field is required</span>}
            </Form.Group>
            <Button type="submit" variant="outline-dark">Log In</Button>
            {' '} or {' '}
            <Button variant="link" onClick={() => navigate('/signup')}>Create account</Button>
        </Form>
    );

}

export default SignIn;