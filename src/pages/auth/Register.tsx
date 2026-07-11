import RegisterForm from "../../components/forms/RegisterForm";
import Seo from "../../components/common/Seo";

function Register() {
    return (
        <>
            <Seo
                title="Create Your Free Account"
                description="Sign up for AI Resume Screener to get instant ATS resume scoring, AI-powered improvement suggestions, and apply to jobs that match your skills."
                path="/register"
            />
            <RegisterForm />
        </>
    );
}

export default Register;