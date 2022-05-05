import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useState} from "react";

function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Already signed in</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div className="backdrop" onClick={() => props.onClose}>
        <div className={"modal sign-up-modal"}>
            <h4>Sign Up</h4>
            {props.children}
            <div className={"sign-up-page"}>
                {error && <p className={"error-message"}>Error signing up: {error.message}</p>}

                <div className={"enter-creds"}>
                    <div className={"input-creds"}>
                        <input type="email" id='email' placeholder={"Email address"} value={email} className={"creds"}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <br/>
                    <div className={"input-creds"}>
                        <input type="text" id='pw' placeholder={"Password"} value={pw} className={"creds"}
                               onChange={(e) => setPw(e.target.value)}/>
                    </div>
                </div>

                <br/><br/>
                <div className={"sign-up-buttons"}>
                    <button className={"alert-button alert-cancel sign-up-button"} type={"button"}
                            onClick={() =>
                                createUserWithEmailAndPassword(email, pw)}>
                        Create account
                    </button>
                    <button className={"alert-button alert-ok sign-up-button"} type={"button"}
                            onClick={() => props.onClose()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default SignUp