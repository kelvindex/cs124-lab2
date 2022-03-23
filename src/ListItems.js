import ListItem from "./ListItem";

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

        <label id="addItem">
            <input type="text" className="inputItem" placeholder="Add item"
                   onKeyPress={(e) => {props.onAddItem(e.key, e.target.value); if (e.key === 'Enter') {e.target.value = ""}}}/>
        </label>
        </ul>


    </>

}

export default ListItems