import LoginForm from "../../components/forms/LoginForm";
import Seo from "../../components/common/Seo";

function Login() {
    return (
        <>
            <Seo
                title="Log In"
                description="Log in to your AI Resume Screener account to track applications, view resume scores, and apply to matched jobs."
                path="/login"
            />
            <LoginForm />
        </>
    );
}

export default Login;