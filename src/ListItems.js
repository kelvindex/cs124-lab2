import {useState} from "react";
import ListItem from "./ListItem";

function ListItems(props) {

    return <>
        <span id="uncomplete">Hide Completed Tasks</span><input type="checkbox" onChange={props.onCompletedToggle} className="toggle"/>

        <ul>
        {props.data.map(i =>
            <ListItem  item={i}
                       onItemCompleted={props.onItemCompleted}
                       onItemNotCompleted={props.onItemNotCompleted}
                       isCompleted={props.completedItems.includes(i.id)}
                       key={i.id}
                       onEditItem={props.onEditItem}
            />
        )}

        <label id="addItem">
            <input type="text" className="inputItem" placeholder="Add item"
                                                                  onKeyPress={props.onAddItem}/>
        </label>
        </ul>

        </>

}

export default ListItems