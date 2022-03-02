import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import ListItems from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function App(props) {
    const [items, setItems] = useState(props.initialData);
    const [completedItems, setCompletedItems] = useState([]);
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
            console.log("handle add item");
            const newItem = {id: generateUniqueID(), value: e.target.value};
            setItems([...items, newItem]);
            totalItems.push(newItem);
            e.target.value = "";
        }
    }

    function handleDeleteCompleted() {
        // make pop up box
        // totalItems.filter(i => !completedItems.includes(i.id)))
        // setItems(items.filter(i => !completedItems.includes(i.id)));
    }

    function handleToggleCompleted(e) {
        console.log("toggle completed items in list", e.target.checked);
        if(e.target.checked) {
            setItems(items.filter(i => !completedItems.includes(i.id)));
        }
        else {
            setItems(totalItems);
        }
    }

    function handleCompletedItems(item) {
        console.log("toggle completed");
        setCompletedItems([...completedItems, item.id]);
    }

    function handleNotCompleted(item) {
        console.log("toggle unchecked");
        setCompletedItems(completedItems.filter(i => !(i===item.id)));
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
        <button id="delete">Delete completed items </button>
    </>;
}

export default App;
