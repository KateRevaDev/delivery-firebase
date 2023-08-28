import SignIn from "../components/Auth/SignIn";
import Layout from "../components/containers/Layout"

const Profile = ({ username }) => {
    return (
    <Layout>
        Profile info
        {username ? '' : <SignIn />} 
    </Layout>
    );
}

export default Profile;
