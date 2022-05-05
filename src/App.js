import {useState} from "react";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {FaBars, FaGoogle, FaPlus, FaTrashAlt, FaUserPlus} from "react-icons/fa";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {collection, doc, getFirestore, query, setDoc, updateDoc, where} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import TaskLists from "./TaskLists";
import AddListPopUp from "./AddListPopUp";
import {getAuth, signOut} from "firebase/auth";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from "react-firebase-hooks/auth";
import AddCollaboratorPopUp from "./AddCollaboratorPopUp";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web signedInApp's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAx_Uoa4hi54nVFG2FtmKXlQzZbmQbIGng",
    authDomain: "cs124-lab3-6962e.firebaseapp.com",
    projectId: "cs124-lab3-6962e",
    storageBucket: "cs124-lab3-6962e.appspot.com",
    messagingSenderId: "275550647862",
    appId: "1:275550647862:web:d229d0a8cfca991d114a97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = "TaskLists-Auth"
// const subCollectionName = "tasks";

const auth = getAuth();

function App() {
    const [user, userLoading, userError] = useAuthState(auth);
    const [signUpPopUp, setSignUpPopUp] = useState(false);
    console.log("User: ", user);

    if (userLoading) {
        return <div className="load">"loading..."</div>;
    }

    if (userError) {
        console.log("User info: ", user);
        console.log(userError);
        return "there's been an error logging in"
    }

    function handleSignUpPopUp() {
        setSignUpPopUp(!signUpPopUp);
    }

    return <>
        {user ? <SignedInApp auth={auth} user={user}/> : <SignIn auth={auth} onSignUp={handleSignUpPopUp}/>}
        {signUpPopUp && <SignUp onSignUp={handleSignUpPopUp} onClose={handleSignUpPopUp}/>}
    </>;

}

function SignIn(props) {
    const [
        signInWithEmailAndPassword,
        epUser, loadingUser, epError
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, loadingGoogle, googleError] = useSignInWithGoogle(auth);

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
        <input type="text" id='email' value={email} className={"creds"}
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

function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
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
        <div className="modal">
            <h4>Sign Up</h4>
            {props.children}
            <div className={"sign-up-page"}>
                {error && <p>"Error signing up: " {error.message}</p>}
                <label htmlFor='email'>email: </label>
                <input type="text" id='email' value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label htmlFor='pw'>pw: </label>
                <input type="text" id='pw' value={pw}
                       onChange={(e) => setPw(e.target.value)}/>
                <br/><br/>
                <div className="add-popup-buttons">
                    <button className={"alert-button alert-cancel"} type={"button"}
                            onClick={() =>
                                createUserWithEmailAndPassword(email, pw)}>
                        Create account
                    </button>
                    <button className={"alert-button alert-ok"} type={"button"}
                            onClick={() => props.onClose()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
}


function SignedInApp(props) {
    const [completedToggle, setCompletedToggle] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [addPopUp, setAddPopUp] = useState(false);
    const [editPopUp, setEditPopUp] = useState(false);
    const [priorityValue, setPriorityValue] = useState(0);
    const [addListPopUp, setAddListPopUp] = useState(false);
    const [deleteListPopUp, setDeleteListPopUp] = useState(false);

    const [listItemData, setListItemData] = useState("");

    const priorityOrder = ["priority", "desc"];
    const nameOrder = ["value", "asc"];
    const timeOrder = ["time", "asc"];
    const [orderType, setOrderType] = useState(timeOrder);

    const [showLists, setShowLists] = useState(false);
    const [currentListId, setCurrentListId] = useState("");
    const [currentListTitle, setCurrentListTitle] = useState("Tasks");

    const [sharedWithLocal, setSharedWithLocal] = useState([]);
    const [addCollabPopUp, setAddCollabPopUp] = useState(false);

    const tasksListsQ = query(collection(db, collectionName), where("owner", "==", props.user.uid));
    const [taskLists, listsLoading, listsError] = useCollectionData(tasksListsQ);

    function handleEditPopUp() {
        setEditPopUp(!editPopUp)
    }

    function handleAddListPopUp() {
        setAddListPopUp(!addListPopUp);
    }

    function handleAddList(key, listName) {
        if (key === 'Enter') {
            const newId = generateUniqueID();
            const newList = {
                title: listName, owner: props.user.uid,
                sharedWith: [], id: newId
            };
            setDoc(doc(db, collectionName, newId), newList);
            setCurrentListId(newId);
            setCurrentListTitle(listName);
            handleAddListPopUp();
        }
    }

    function handleAddPopUp() {
        setAddPopUp(!addPopUp);
    }

    function handleToggleCompleted() {
        setCompletedToggle(!completedToggle);
    }

    function handleDeleteCompletedPopUp() {
        setShowDeleteAlert(!showDeleteAlert);
    }

    function handleSetPriorityValue(priority) {
        setPriorityValue(priority);
    }

    function handleOrderBy(ordering) {
        if (ordering === "priority") {
            setOrderType(priorityOrder);
        } else if (ordering === "name") {
            setOrderType(nameOrder)
        } else {
            setOrderType(timeOrder)
        }

    }

    function getListItemData(listItemData) {
        setListItemData(listItemData);
        console.log("data: ", listItemData);
    }

    function handleShowLists() {
        setShowLists(!showLists);
    }

    function handleSetCurrentListId(listId, listName) {
        setCurrentListId(listId);
        setCurrentListTitle(listName);
    }

    function handleDeleteListPopUp() {
        setDeleteListPopUp(!deleteListPopUp);
    }

    function handleAddCollabPopUp() {
        setAddCollabPopUp(!addCollabPopUp);
    }

    function handleAddCollab(key, email) {
        if (key === 'Enter') {
            setSharedWithLocal([...sharedWithLocal, email]);
            console.log("Shared with: ", sharedWithLocal);
            updateDoc(doc(db, collectionName, currentListId), {sharedWith: sharedWithLocal});
            handleAddCollabPopUp();
        }
    }

    return <>
        <div className="top-nav">
            <button className="toggle-side-menu" onClick={handleShowLists} aria-label={"Tasks List"}><FaBars/></button>
            <div id="titleBar">
                <h1>{currentListId !== "" ? currentListTitle : "Create list"}
                    {currentListId !== "" ?
                        <button className="delete-list-button" onClick={handleDeleteListPopUp}><FaTrashAlt/></button> :
                        null}</h1>
                {currentListId !== "" && <button onClick={handleAddCollabPopUp}><FaUserPlus/> Add Collaborators</button>}
                <div className={"right-navbar"}>
                    <p>{props.user.displayName || props.user.email}</p>
                    <button className={"sign-out"} onClick={() => signOut(auth)}>Sign Out</button>
                </div>
            </div>
        </div>

        {showLists && <TaskLists lists={taskLists}
                                 onCloseSideBar={handleShowLists}
                                 loading={listsLoading}
                                 error={listsError}
                                 currentListId={currentListId}
                                 onAddNewList={handleAddList}
                                 onAddListPopUp={handleAddListPopUp}
                                 addListPopUp={addListPopUp}
                                 onDeleteListPopUp={handleDeleteListPopUp}
                                 onChangeCurrentList={handleSetCurrentListId}/>
        }
        {currentListId === "" &&
            <button className="add-list-button" onClick={handleAddListPopUp}><FaPlus/> New list</button>}
        {addListPopUp &&
            <AddListPopUp onAddNewList={handleAddList} onClose={handleAddListPopUp}><h4>New List</h4></AddListPopUp>}


        {currentListId !== "" && <ListItems onCompletedToggle={handleToggleCompleted}
                                            onToggleEditItem={handleEditPopUp}
                                            onOrderBy={handleOrderBy}
                                            onGetListItemData={getListItemData}
                                            onSetPriority={handleSetPriorityValue}
                                            onSetCurrentListId={handleSetCurrentListId}
                                            onDeleteListPopUp={handleDeleteListPopUp}
                                            onDeleteCompletedPopUp={handleDeleteCompletedPopUp}
                                            onAddPopUp={handleAddPopUp}
                                            onEditPopUp={handleEditPopUp}
                                            currentListId={currentListId}
                                            priority={priorityValue}
                                            completedToggle={completedToggle}
                                            db={db}
                                            collectionName={collectionName}
                                            listItemData={listItemData}
                                            orderType={orderType}
                                            editPopUp={editPopUp}
                                            addPopUp={addPopUp}
                                            deleteListPopUp={deleteListPopUp}
                                            showDeleteAlert={showDeleteAlert}
        />}

        {addCollabPopUp && <AddCollaboratorPopUp onAddCollab={handleAddCollab} onClose={handleAddCollabPopUp}/>}
        {currentListId !== "" && <button className="add-button" onClick={handleAddPopUp}><FaPlus/> Add item</button>}

        <br/><br/>
        {currentListId !== "" && !completedToggle &&
            <button id="delete" onClick={handleDeleteCompletedPopUp}>Delete completed items</button>}
    </>;
}

export default App;