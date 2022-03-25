import './App.css';
import {useState} from "react";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, setDoc, doc, updateDoc, deleteDoc, orderBy} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {FaPlus} from "react-icons/fa";
import AddPopUp from "./AddPopUp";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const collectionName = "Tasks";

function App() {
    const [completedToggle, setCompletedToggle] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [addPopUp, setAddPopUp] = useState(false);
    const [priorityValue, setPriorityValue] = useState(0);
    const [orderByPriority, setOrderByPriority] = useState(false);

    const q = query(collection(db, collectionName));
    const [tasks, loading, error] = useCollectionData(q);

    const priorityQ = query(collection(db, collectionName), orderBy("priority", "desc"));
    const [priorityOrderedTasks, priorityLoading, priorityError] = useCollectionData(priorityQ);

    function handleEditItem(itemId, value, field) {
        setDoc(doc(db, collectionName, itemId),
            {[field]: value}, {merge: true});
    }

    function handleAddItem(key, value) {
        if (key === 'Enter') {
            const newId = generateUniqueID();
            const newItem = {id: newId, value: value, completed: false, priority: priorityValue};
            setDoc(doc(db, collectionName, newId), newItem);
        }
    }

    function handleDeleteCompleted() {
        tasks.forEach(i => {
            if (i.completed) deleteDoc(doc(db, collectionName, i.id))
        });
        toggleModal(); // close pop up
    }

    function handleAddPopUp() {
        setAddPopUp(!addPopUp);
    }

    function handleToggleCompleted() {
        setCompletedToggle(!completedToggle);
    }

    function handleChangeCompletedItems(item) {
        updateDoc(doc(db, collectionName, item.id), {completed: !item.completed});
    }

    function toggleModal() {
        setShowDeleteAlert(!showDeleteAlert);
    }

    function handleSelectAll() {
        tasks.forEach(i => i.completed === false ? updateDoc(doc(db, collectionName, i.id), {completed: true}) : i);
    }

    function handleDeselectAll() {
        tasks.forEach(i => i.completed === true ? updateDoc(doc(db, collectionName, i.id), {completed: false}) : i);
    }

    function handleSetPriorityValue(priority) {
        setPriorityValue(priority);
    }

    if (loading) {
        return <div className="load">"loading..."</div>;
    }

    if (error) {
        console.log(error);
        return "there's been an error"
    }

    if (priorityLoading) {
        return <div className="load">"loading..."</div>;
    }
    if (priorityError) {
        return "there's been an error"
    }

    function handleOrderByPriority() {
        setOrderByPriority(!orderByPriority);
    }

    return <>
        <div id="titleBar">
            <h1>Tasks</h1>
        </div>

        <ListItems data={completedToggle ? tasks.filter(i => !i.completed) : tasks || orderByPriority ? priorityOrderedTasks : tasks}
                   onSelectAll={handleSelectAll}
                   onDeselectAll={handleDeselectAll}
                   onCompletedToggle={handleToggleCompleted}
                   onChangeCompletedItems={handleChangeCompletedItems}
                   onEditItem={handleEditItem}
                   onAddItem={handleAddItem}
                   onOrderByPriority={handleOrderByPriority}
                   priority={priorityValue}
        />

        <button className="add-button" onClick={handleAddPopUp}><FaPlus/> Add item</button>
        {addPopUp && <AddPopUp onAddItem={handleAddItem} onClose={handleAddPopUp} priority={priorityValue} onSetPriority={handleSetPriorityValue}>
            <h4>New item</h4></AddPopUp>}
        <br/><br/>
        {tasks.filter(i => i.completed).length !== 0 && !completedToggle &&
            <button id="delete" onClick={toggleModal}>Delete completed items</button>}
        {showDeleteAlert && <DeleteCompletedAlert onClose={toggleModal} onDelete={handleDeleteCompleted}>
            <div>
                Are you sure you want to delete all completed items?
            </div>
        </DeleteCompletedAlert>}
    </>;
}

export default App;