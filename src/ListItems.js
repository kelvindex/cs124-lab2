import {useState} from "react";
import {ListItem} from "./ListItem";

export function ListItems(props) {

    return <ul>
        {props.data.map(i =>
            <ListItem  item={i}
                       key={i.id}
                       onEditItem={props.onEditItem}
            />
        )}

        <label id="addItem">
            <input type="checkbox" className="greenCheck"/><input type="text" className="inputItem" placeholder="Add item"
                                                                  onKeyPress={props.onAddItem}/>
        </label>
        </ul>

}