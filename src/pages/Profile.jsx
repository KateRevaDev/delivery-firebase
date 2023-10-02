import SignIn from "../components/Auth/SignIn";
import Layout from "../components/containers/Layout"
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../api/queries";
import { Button } from "react-bootstrap";

const auth = getAuth(firebaseApp());

const logout = () => {
    signOut(auth);
};

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);

    if (!user) {
        return (
            <Layout>
                <SignIn />
            </Layout>
        );
    }
    return (
        <Layout>
            <div>
                Profile info {user.email}
            </div>
            <Button variant="outline-dark" onClick={logout}>Log out</Button>
        </Layout>
    );
}

export default Profile;
