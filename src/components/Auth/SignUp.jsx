import { useNavigate } from "react-router-dom";
import Layout from "../containers/Layout";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { firebaseApp } from '../../api/queries';

const auth = getAuth(firebaseApp());

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = ({ email, password }) => {
        createUserWithEmailAndPassword(email, password);
    };

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (user) {
        navigate('/profile');
        return <></>;
    }

    return (
        <Layout>
            {loading ? <p>Loading...</p>
                : (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register("email", { required: true })} placeholder="Your email" />
                            {errors.email && <span>This field is required</span>}
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                    <Form.Label>Login</Form.Label>
                    <Form.Control {...register("login", { required: true })} placeholder="Your login" />
                    {errors.login && <span>This field is required</span>}
                </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...register("password", { required: true })} type="password" placeholder="Your password" />
                            {errors.password && <span>This field is required</span>}
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control {...register("confirmPassword", { required: true })} type="password" placeholder="Confirm password" />
                    {errors.confirmPassword && <span>This field is required</span>}
                </Form.Group> */}
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
                )}
        </Layout>
    );
}

export default SignUp;
