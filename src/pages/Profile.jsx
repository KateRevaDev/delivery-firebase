import SignIn from "../components/Auth/SignIn";
import Layout from "../components/containers/Layout"

const Profile = ({ username }) => {
    return (
    <Layout>
        {username ? `Profile info ${username}` : <SignIn />} 
    </Layout>
    );
}

export default Profile;
