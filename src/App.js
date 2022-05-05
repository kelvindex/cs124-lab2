import {useState} from "react";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {FaBars, FaPlus, FaTrashAlt, FaUser, FaUsers} from "react-icons/fa";
import {NotificationContainer, NotificationManager} from 'react-notifications';

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {collection, doc, getFirestore, query, setDoc, updateDoc, where} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import TaskLists from "./TaskLists";
import AddListPopUp from "./AddListPopUp";
import {getAuth, sendEmailVerification, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import ManageCollaborators from "./ManageCollaborators";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
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
const collectionName = "TaskLists-Sharing";

const auth = getAuth();

function App() {
    const [user, userLoading, userError] = useAuthState(auth);
    const [signUpPopUp, setSignUpPopUp] = useState(false);

    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (userLoading) {
        return <div className="load">"loading..."</div>;
    }

    if (userError) {
        console.log(userError);
        return "there's been an error logging in"
    }

    function handleSignUpPopUp() {
        setSignUpPopUp(!signUpPopUp);
    }

    return <>
        {user ? <SignedInApp auth={auth} user={user} verifyEmail={verifyEmail}/> : <SignIn auth={auth} onSignUp={handleSignUpPopUp}/>}
        {signUpPopUp && <SignUp auth={auth} onSignUp={handleSignUpPopUp} onClose={handleSignUpPopUp}/>}

    </>;

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

    const [addCollabPopUp, setAddCollabPopUp] = useState(false);
    const [sharedWithLocal, setSharedWithLocal] = useState([props.user.email, "magalingouabou@gmail.com"]);

    // questions:
    // 1. what is the syntax for updating the sharedwith list in the cloud? and do i use a get
    // in order to use and display the list from the code base?
    const tasksListsQ = query(collection(db, collectionName), where("sharedWith", "array-contains", props.user.email));
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
                sharedWith: [props.user.email, "magalingouabou@gmail.com"], id: newId
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
            updateDoc(doc(db, collectionName, currentListId), {sharedWith: sharedWithLocal});
            handleAddCollabPopUp();
        }
    }

    function handleVerifyEmail() {
        console.log("got clicked");
        NotificationManager.warning("Please check your inbox", "Verification email sent", 3000);
        props.verifyEmail();
    }

    return <>
        <div className="top-nav">
            <button className="toggle-side-menu" onClick={handleShowLists} aria-label={"Tasks List"}><FaBars/></button>
            <div id="titleBar">
                <h1>{currentListId !== "" ? currentListTitle : "Create list"}
                    {currentListId !== "" ?
                        <button style={{verticalAlign: 'middle'}} className="delete-list-button" onClick={handleDeleteListPopUp}><FaTrashAlt /></button> :
                        null}</h1>

                {currentListId !== "" && <button className={"add-collab-button"} onClick={handleAddCollabPopUp}><FaUsers style={{verticalAlign: 'text-top'}}/> Collaborators</button>}

                <div className={"right-navbar"}>
                    <p><FaUser style={ {verticalAlign: 'text-bottom'}}/> {props.user.displayName || props.user.email}</p>
                    {!props.user.emailVerified && <button type="button" className={'verify-email-button'} onClick={handleVerifyEmail}>Verify email</button>}
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

        {addCollabPopUp && <ManageCollaborators onAddCollab={handleAddCollab} sharedWith={sharedWithLocal} onClose={handleAddCollabPopUp}/>}
        {currentListId !== "" && <button className="add-button" onClick={handleAddPopUp}><FaPlus/> Add item</button>}

        <br/><br/>
        {currentListId !== "" && !completedToggle &&
            <button id="delete" onClick={handleDeleteCompletedPopUp}>Delete completed items</button>}
        <NotificationContainer/>
    </>;
}

export default App;