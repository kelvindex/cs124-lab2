import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function App(props) {
    const [items, setItems] = useState(props.initialData);
    const [completedItems, setCompletedItems] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const deletedItems = [];
    const totalItems = props.initialData;

    function handleEditItem(itemId, value, field) {
        setItems(
            items.map(
                (item) => (item.id === itemId ? {...item, [field]: value} : item)
            )
        );
    }

    function handleAddItem(e) {
        if (e.key === 'Enter') {
            const newItem = {id: generateUniqueID(), value: e.target.value}; // add a boolean for completed
            setItems([...items, newItem]);
            totalItems.push(newItem);
            e.target.value = "";
        }
    }

    function handleDeleteItem() {

    }

    function handleUndoDelte() {

    }

    function handleDeleteCompleted() {
        totalItems.filter(i => !completedItems.includes(i.id));
        setItems(items.filter(i => !completedItems.includes(i.id)));
        setCompletedItems([]);
        setShowDeleteAlert(!showDeleteAlert);
    }

    function handleToggleCompleted(e) {
        if (e.target.checked) {
            setItems(items.filter(i => !completedItems.includes(i.id)));
        } else {
            setItems(totalItems);
        }
    }

    function handleCompletedItems(item) {
        setCompletedItems([...completedItems, item.id]);
    }

    function handleNotCompleted(item) {
        setCompletedItems(completedItems.filter(i => !(i === item.id)));
    }

    function toggleModal() {
        console.log("toggle");
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
