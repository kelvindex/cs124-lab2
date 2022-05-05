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
        <p className="sign" align="center">Sign in</p>
        <label htmlFor='email'>email: </label>
        <input type="email" id='email' value={email} className={"creds"}
               onChange={e => setEmail(e.target.value)}/>
        <br/><br/>
        <label htmlFor='pw'>pw: </label>
        <input type="password" id='pw' value={pw} className={"creds"}
               onChange={e => setPw(e.target.value)}/>
        <br/> <br/>
        <button onClick={() => signInWithEmailAndPassword(email, pw)}>
            Sign in with email/pw
        </button>
        <br/>
        <br/><br/><br/>
        <p>Don't have an account with us?</p>
        <br/>
        <button className="sign-in-google" onClick={() => signInWithGoogle()}>
            <FaGoogle/> Sign in with Google
        </button>
        <br/><br/>
        <button onClick={() => props.onSignUp()} className={"sign-up"}>Sign Up</button>
    </div>
}

export default SignIn;