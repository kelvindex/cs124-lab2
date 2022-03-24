import ListItem from "./ListItem";
import {FaPlus} from "react-icons/fa";
function ListItems(props) {

    return <>
        <span id="uncomplete">Hide completed tasks</span><input type="checkbox" onChange={props.onCompletedToggle}
                                                                className="toggle"/>

        <ul>
            {props.data.map(i =>
                <ListItem item={i}
                          onChangeCompletedItems={props.onChangeCompletedItems}
                          isCompleted={i.completed}
                          key={i.id}
                          onEditItem={props.onEditItem}
                />
            )}


        </ul>


    </>

}

export default ListItems