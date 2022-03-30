import './App.css';
import {useState} from "react";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore"; // useCollection
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
const collectionName = "taskList";

function App() {
    const [completedToggle, setCompletedToggle] = useState(false);
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef);
    let [tasks, loading, error] = useCollectionData(q);

    // const tasksF = [useCollectionData(query(collection(db, collectionName), where("hidden","==","false")))];

    // const filteredTasks = query(collectionRef, where("hidden","==","false"));
    // const [tasksF, loadingF, errorF] = useCollectionData(filteredTasks);


    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    function handleItemSelected(item) {
        setDoc(doc(db, collectionName, item.id),
            {completed: !item.completed}, {merge: true});
    }

    function handleEditItem(itemId, value, field) {
        setDoc(doc(db, collectionName, itemId),
            {[field]: value}, {merge: true});
    }

    function handleAddItem(key, value) {
        if (key === 'Enter') {
            const currentDate = new Date();
            const dateTime = "Last Sync: " + currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();
            const newId = generateUniqueID();
            const newItem = {id: newId, value: value, completed: false, hidden: false, priority: 3, date: dateTime};
            setDoc(doc(db, collectionName, newId), newItem);
        }
    }

    function handleDeleteCompleted() {
        tasks.forEach(i => i.completed ? deleteDoc(doc(db, collectionName, i.id)) : i);
        toggleModal(); // close pop up
    }

    function handleToggleCompleted() {
        // tasks.forEach(i => i.completed ? setDoc(doc(db, completedCollectionName, i.id)) : i);
        tasks.forEach(i => i.completed ? setDoc(doc(db, collectionName, i.id),
            {hidden: !completedToggle}, {merge: true}) : i);
        setCompletedToggle(!completedToggle);
    }

    function handleSelectAll() {
        tasks.forEach(i => i.completed === false ? setDoc(doc(db, collectionName, i.id), {completed: true}) : i);
    }

    function handleDeselectAll() {
        tasks.forEach(i => i.completed === true ? setDoc(doc(db, collectionName, i.id), {completed: false}) : i);
    }

    function handleOrderItems(value) {
        collectionRef.orderBy("value");
    }


    function toggleModal() {
        setShowDeleteAlert(!showDeleteAlert);
    }

    if (loading) {
        return "loading...";
    }

    if (error) {
        return "there's been an error"
    }
    return <>
        <div id="titleBar">
            <h1>Tasks</h1>
        </div>

        <ListItems data={tasks.filter(i => i.hidden === false)}
                   onCompletedToggle={handleToggleCompleted}
                   onItemSelected={handleItemSelected}
                   onSelectAll={handleSelectAll}
                   onDeselectAll={handleDeselectAll}
                   onEditItem={handleEditItem}
                   onAddItem={handleAddItem}
                   onOrderItems={handleOrderItems}

        />
        <br/><br/>
        {<button id="delete" onClick={toggleModal}>Delete completed items</button>}
        {showDeleteAlert && <DeleteCompletedAlert onClose={toggleModal} onDelete={handleDeleteCompleted}>
            <div>
                Are you sure you want to delete all completed items?
            </div>
        </DeleteCompletedAlert>}
    </>;
}

export default App;