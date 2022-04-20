import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {getAuth} from "@firebase/auth";
import SignedInApp from "./SignedInApp";
import {FaGoogle} from "react-icons/fa";

function SignIn(props) {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(props.auth);
    if (user) {
        return <p>Already signed in</p>
    }
    else if (loading) {
        return <div className={"login-loading"}>logging in...</div>
    }

    return <div className="sign-in-page"> {error && <div>there's been an error</div> }
            <button className="sign-in-google" onClick={() => signInWithGoogle()}><FaGoogle/> Sign in with Google </button>
        </div>
}

function App() {
    const auth = getAuth();
    const [user, userLoading, userError] = useAuthState(auth);
    console.log(user);

    if (userLoading) {
        return <div className="load">"loading..."</div>;
    }

    if (userError) {
        console.log("User info: ", user);
        console.log(userError);
        return "there's been an error logging in"
    }

    return <>
            {user ? <SignedInApp auth={auth} user={user}/> : <SignIn auth={auth}/> }
        </>;

}

export default App;