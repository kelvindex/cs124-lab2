import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {ListItems} from "./ListItems";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function App() {
    const [items, setItems] = useState([]);

    function handleEditItem(itemId, value) {
        console.log("handle edit item");
        // setItems(
        //     items.map(
        //         (items) => (items.id === itemId ? {...items, value} : items)
        //     )
        // );
    }
    function handleAddItem(e) {
        if (e.key === 'Enter') {
            console.log("handle add item");
            setItems([...items, {id: generateUniqueID(), item: e.target.value}]);
        }
    }


    return <>
        <div id="titleBar">
            <h1>Tasks</h1>
        </div>
        <span id="uncomplete">Hide Completed Tasks</span> <input type="checkbox" className="toggle"/>

        <ListItems data={items} setItems={setItems}
                    onEditItem={handleEditItem}
                   onAddItem={handleAddItem}
        />
        <br/><br/>
        <button id="delete">Delete completed items </button>
    </>;
}

export default App;
