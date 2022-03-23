import './App.css';
import {useState} from "react";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
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

function App(props) {
    const [items, setItems] = useState(props.initialData);
    const [completedToggle, setCompletedToggle] = useState(false);
    const completedItems = items.filter(i => i.completed);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    function handleEditItem(itemId, value, field) {
        setItems(
            items.map(
                (item) => (item.id === itemId ? {...item, [field]: value} : item)
            )
        );
    }

    function handleAddItem(key, value) {
        if (key === 'Enter') {
            const newItem = {id: generateUniqueID(), value: value, completed: false};
            setItems([...items, newItem]);
        }
    }

    function handleDeleteCompleted() {
        setItems(items.filter(i => !i.completed));
        toggleModal(); // close pop up
    }

    function handleToggleCompleted() {
        setCompletedToggle(!completedToggle);
    }

    function handleChangeCompletedItems(item) {
        setItems(items.map(i => i.id === item.id ? {... i, completed: !i.completed} : i));
    }

    function toggleModal() {
        setShowDeleteAlert(!showDeleteAlert);
    }

    return <>
        <div id="titleBar">
            <h1>Tasks</h1>
        </div>

        <ListItems data={completedToggle ? items.filter(i => !i.completed) : items}
                   setItems={setItems}
                   completedItems={completedItems}
                   onCompletedToggle={handleToggleCompleted}
                   onChangeCompletedItems={handleChangeCompletedItems}
                   onEditItem={handleEditItem}
                   onAddItem={handleAddItem}
        />
        <br/><br/>
        {completedItems.length !==0 && <button id="delete" onClick={toggleModal}>Delete completed items</button>}
        {showDeleteAlert && <DeleteCompletedAlert onClose={toggleModal} onDelete={handleDeleteCompleted}>
            <div>
                Are you sure you want to delete all completed items?
            </div>
        </DeleteCompletedAlert>}
    </>;
}

export default App;