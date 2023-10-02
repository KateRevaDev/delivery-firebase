import { bindActionCreators } from "@reduxjs/toolkit";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../saga/actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../api/queries";
import { useEffect } from "react";

const auth = getAuth(firebaseApp());

const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
    signOut(auth);
};

const SignIn = () => {

    const [user, loading, error] = useAuthState(auth);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { updateUserInfo } = bindActionCreators(actions, dispatch);

    useEffect(() => {
        if (user) {
            updateUserInfo(user);
        }
    }, [user]);

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }
    if (user) {
        console.log('user ', user);
        return (
            <div>
                <p>Current User: {user.email}</p>
                <Button variant="outline-dark" onClick={logout}>Log out</Button>
            </div>
        );
    }

    return (
        <Form onSubmit={handleSubmit(login)}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email", { required: true })} placeholder="Your email" />
                {errors.email && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password", { required: true })} type="password" placeholder="Your password" />
                {errors.password && <span>This field is required</span>}
            </Form.Group>
            <Button type="submit" variant="outline-dark">Log In</Button>
            {' '} or {' '}
            <Button variant="link" onClick={() => navigate('/signup')}>Create account</Button>
        </Form>
    );

}

export default SignIn;