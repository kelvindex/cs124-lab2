import './App.css';
import {useState} from "react";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {FaBars, FaTrashAlt} from "react-icons/fa";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, setDoc, doc, updateDoc, deleteDoc, orderBy, serverTimestamp} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {FaPlus} from "react-icons/fa";
import AddPopUp from "./AddPopUp";
import EditPopUp from "./EditPopUp";
import TaskLists from "./TaskLists";
import DeleteListPopUp from "./DeleteListPopUp";
import AddListPopUp from "./AddListPopUp";
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
const collectionName = "TaskLists"
// const subCollectionName = "tasks";

function App() {
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
    const [subCollectionName, setSubCollectionName] = useState("");
    const [currentListTitle, setCurrentListTitle] = useState("Tasks");

    const tasksListsQ = query(collection(db, collectionName));
    const [tasksLists, listsLoading, listsError] = useCollectionData(tasksListsQ);

    const sortedQ = query(collection(db, collectionName, currentListId, subCollectionName), orderBy(orderType[0], orderType[1]));
    const [tasks, loading, error] = useCollectionData(sortedQ);

    function handleEditItem(itemId, value, field) {
        setDoc(doc(db, collectionName, currentListId, subCollectionName, itemId),
            {[field]: value}, {merge: true});
        // handleEditPopUp();

    }

    function handleEditPopUp() {
        setEditPopUp(!editPopUp)
    }

    function handleAddListPopUp() {
        setAddListPopUp(!addListPopUp);
    }

    function handleAddItem(key, value) {
        if (key === 'Enter') {
            const newId = generateUniqueID();
            const newItem = {id: newId, value: value, completed: false, priority: priorityValue, time: serverTimestamp()};
            setDoc(doc(db, collectionName, currentListId, subCollectionName, newId), newItem);
        }
    }

    function handleAddList(key, listName) {
        if (key === 'Enter') {
            const newId = generateUniqueID();
            const newList = {title: listName, tasks: [], id: newId};
            setDoc(doc(db, collectionName, newId), newList);
            setCurrentListId(newId);
            setCurrentListTitle(listName);
            setSubCollectionName("tasks");
            handleAddListPopUp();
        }
    }

    function handleDeleteCompleted() {
        tasks.forEach(i => {
            if (i.completed) deleteDoc(doc(db, collectionName, currentListId, subCollectionName, i.id))
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
        updateDoc(doc(db, collectionName, currentListId, subCollectionName, item.id), {completed: !item.completed});
    }

    function toggleModal() {
        setShowDeleteAlert(!showDeleteAlert);
    }

    function handleSelectAll() {
        tasks.forEach(i => i.completed === false ? updateDoc(doc(db, collectionName, currentListId, subCollectionName, i.id), {completed: true}) : i);
    }

    function handleDeselectAll() {
        tasks.forEach(i => i.completed === true ? updateDoc(doc(db, collectionName, currentListId, subCollectionName, i.id), {completed: false}) : i);
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

    function handleOrderBy(ordering) {
        if (ordering === "priority") {
            setOrderType(priorityOrder);
        }
        else if (ordering === "name") {
            setOrderType(nameOrder)
        }
        else {
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
        setSubCollectionName("tasks");
        setCurrentListTitle(listName);
    }

    function handleDeleteListPopUp() {
        setDeleteListPopUp(!deleteListPopUp);
    }

    function handleDeleteList() {
        deleteDoc(doc(db, collectionName, currentListId));
        setCurrentListId("");
        setSubCollectionName("");
        handleDeleteListPopUp();
    }

    return <>
        <div className="top-nav">
            <button className="toggle-side-menu" onClick={handleShowLists} aria-label={"Tasks List"}><FaBars/></button>
            <div id="titleBar">
                <h1>{currentListId !== "" ? currentListTitle : "Create list"}
                    {currentListId !== "" ? <button className="delete-list-button" onClick={handleDeleteListPopUp}><FaTrashAlt/></button> :
                        null }</h1>
            </div>
        </div>

        {showLists && <TaskLists lists={tasksLists}
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
        {currentListId === "" && <button className="add-list-button" onClick={handleAddListPopUp}><FaPlus/> New list</button>}
        {addListPopUp && <AddListPopUp onAddNewList={handleAddList} onClose={handleAddListPopUp}> <h4>New List</h4></AddListPopUp>}
        {deleteListPopUp && <DeleteListPopUp onDelete={handleDeleteList} onClose={handleDeleteListPopUp}>Delete this list?</DeleteListPopUp>}

        {currentListId !== "" && <ListItems data={completedToggle ? tasks.filter(i => !i.completed) : tasks}
                   onSelectAll={handleSelectAll}
                   onDeselectAll={handleDeselectAll}
                   onCompletedToggle={handleToggleCompleted}
                   onChangeCompletedItems={handleChangeCompletedItems}
                   onToggleEditItem={handleEditPopUp}
                   onAddItem={handleAddItem}
                   onOrderBy={handleOrderBy}
                   onGetListItemData={getListItemData}
                   priority={priorityValue}
        />}

        {currentListId !== "" && <button className="add-button" onClick={handleAddPopUp}><FaPlus/> Add item</button>}
        {addPopUp && <AddPopUp onAddItem={handleAddItem}
                               onClose={handleAddPopUp}
                               priority={priorityValue}
                               onSetPriority={handleSetPriorityValue}>
            <h4>New item</h4></AddPopUp>}
        <br/><br/>
        {tasks.filter(i => i.completed).length !== 0 && !completedToggle &&
            <button id="delete" onClick={toggleModal}>Delete completed items</button>}

        {editPopUp && <EditPopUp onClose={handleEditPopUp}
                                 onEditPriority={handleEditItem}
                                 onFinishEdit={handleEditItem}
                                 listItemData={listItemData}>
            <h4>Edit item</h4></EditPopUp>}

        {showDeleteAlert && <DeleteCompletedAlert onClose={toggleModal} onDelete={handleDeleteCompleted}>
            <div>
                Are you sure you want to delete all completed items?
            </div>
        </DeleteCompletedAlert>}
    </>;
}

export default App;