import { useNavigate } from "react-router-dom";
import Layout from "../containers/Layout";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => console.log(data);

    return (
        <Layout>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Login</Form.Label>
                    <Form.Control {...register("login", { required: true })} placeholder="Your login or email" />
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
                <Button type="submit" variant="outline-dark">Sign Up</Button>
            </Form>
        </Layout>
    );
}

export default SignUp;
