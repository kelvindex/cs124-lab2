import './App.css';
import {useState} from "react";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAx_Uoa4hi54nVFG2FtmKXlQzZbmQbIGng",
//     authDomain: "cs124-lab3-6962e.firebaseapp.com",
//     projectId: "cs124-lab3-6962e",
//     storageBucket: "cs124-lab3-6962e.appspot.com",
//     messagingSenderId: "275550647862",
//     appId: "1:275550647862:web:d229d0a8cfca991d114a97"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App(props) {
    const [items, setItems] = useState(props.initialData);
    const [completedItems, setCompletedItems] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [totalItems, setTotalItems] = useState(props.initialData);

    function handleEditItem(itemId, value, field) {
        setItems(
            items.map(
                (item) => (item.id === itemId ? {...item, [field]: value} : item)
            )
        );
        setTotalItems(items)
    }

    function handleAddItem(e) {
        if (e.key === 'Enter') {
            const newItem = {id: generateUniqueID(), value: e.target.value, completed: false};
            setItems([...items, newItem]);
            setTotalItems([...totalItems, newItem]);
            e.target.value = "";
        }
    }

    function handleDeleteCompleted() {
        setTotalItems(totalItems.filter(i => !completedItems.includes(i.id)));
        setItems(items.filter(i => !completedItems.includes(i.id)));
        setCompletedItems([]);
        setShowDeleteAlert(!showDeleteAlert);
        console.log(items);
        console.log(totalItems);
    }

    function handleToggleCompleted(e) {
        console.log(totalItems);
        if (e.target.checked) {
            setItems(items.filter(i => !completedItems.includes(i.id)));
        } else {
            setItems(totalItems);
        }
    }

    function handleCompletedItems(item) {
        setCompletedItems([...completedItems, item.id]);
        item.completed = true;
    }

    function handleNotCompleted(item) {
        setCompletedItems(completedItems.filter(i => !(i === item.id)));
        item.completed = false;
    }

    function toggleModal() {
        setShowDeleteAlert(!showDeleteAlert);
    }

    return <>
        <div id="titleBar">
            <h1>Tasks</h1>
        </div>

        <ListItems data={items}
                   setItems={setItems}
                   completedItems={completedItems}
                   setCompletedItems={setCompletedItems}
                   onCompletedToggle={handleToggleCompleted}
                   onItemCompleted={handleCompletedItems}
                   onItemNotCompleted={handleNotCompleted}
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