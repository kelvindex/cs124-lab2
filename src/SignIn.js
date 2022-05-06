import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useState} from "react";
import {FaGoogle} from "react-icons/fa";

function SignIn(props) {
    const [
        signInWithEmailAndPassword,
        epUser, loadingUser, epError
    ] = useSignInWithEmailAndPassword(props.auth);
    const [signInWithGoogle, googleUser, loadingGoogle, googleError] = useSignInWithGoogle(props.auth);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (epUser || googleUser) {
        return <p>Already signed in</p>
    } else if (loadingUser || loadingGoogle) {
        return <div className={"login-loading"}>logging in...</div>
    }

    return <div className="sign-in-page">
        {googleError && <div>there's been an error: {googleError.message}</div>}
        {epError && <div>there's been an error: {epError.message}</div>}
        <div className={"top-nav"}><h1 className={"sign-in-title"}>Task Lists</h1></div>
        <h3 className={"sign-in-heading"} align="center">Login</h3>

        <div className={"enter-creds"}>
            <div className={"input-creds"}>
                <input type="email" id='email' value={email} placeholder={"Email address"} className={"creds"}
                       onChange={e => setEmail(e.target.value)}/>
                <br/><br/>
                <input type="password" id='pw' value={pw} placeholder={"Password"} className={"creds pw"}
                       onChange={e => setPw(e.target.value)}/>
            </div>

            <br/> <br/>
            <button id="sign-in-button" className="sign-in" onClick={() => signInWithEmailAndPassword(email, pw)}>
                Sign in
            </button>
        </div>

        <br/><br/>
        <div className={"sign-in-options"}>
        <p>Don't have an account with us?</p>
        <br/>
        <button className="sign-in-option-button sign-in" onClick={() => signInWithGoogle()}>
            <FaGoogle/> Sign in with Google
        </button>
        <br/>
        <button onClick={() => props.onSignUp()} className={"sign-in-option-button sign-up"}>Sign Up</button>
        </div>
    </div>
}

export default SignIn;