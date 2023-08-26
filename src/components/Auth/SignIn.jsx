import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => console.log(data);

    console.log(watch("login")); // watch input value by passing the name of it

    return (

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Login</Form.Label>
                <Form.Control {...register("login",  { required: true })} placeholder="Your login or email" />
                {errors.login && <span>This field is required</span>}
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