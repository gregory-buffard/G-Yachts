import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Auth = () => {
    return (
        <div>
        <h1>Auth Page</h1>
            <LoginLink postLoginRedirectURL="/">Sign in</LoginLink>
            <RegisterLink postLoginRedirectURL="/">Sign up</RegisterLink>
        </div>
    );
}

export default Auth;