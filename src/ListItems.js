import {collection, deleteDoc, doc, orderBy, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import DeleteListPopUp from "./DeleteListPopUp";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddPopUp from "./AddPopUp";
import EditPopUp from "./EditPopUp";
import DeleteCompletedAlert from "./DeleteCompletedAlert";
import ListItemsNested from "./ListItemsNested";
import {FaPlus, FaUsers} from "react-icons/fa";
import ManageCollaborators from "./ManageCollaborators";

function ListItems(props) {
    const subCollectionName = "tasks";
    const sortedQ = query(collection(props.db, props.collectionName, props.currentListId, subCollectionName), orderBy(props.orderType[0], props.orderType[1]));
    const [tasks, loading, error] = useCollectionData(sortedQ);


    if (loading) {
        return <div className="load">"loading..."</div>;
    }

    if (error) {
        console.log("App error: ", error);
        return <div>
            there's been the following error in accessing the task list: {error.message}
        </div>
    }

    function handleDeleteList() {
        tasks.forEach(i => deleteDoc(doc(props.db, props.collectionName, props.currentListId, subCollectionName, i.id)));
        deleteDoc(doc(props.db, props.collectionName, props.currentListId));
        props.onSetCurrentListId("", "");
        props.onDeleteListPopUp();
    }

    function handleDeleteCompleted() {
        tasks.forEach(i => {
            if (i.completed) deleteDoc(doc(props.db, props.collectionName, props.currentListId, subCollectionName, i.id))
        });
        props.onDeleteCompletedPopUp(); // close pop up
    }

    function handleAddItem(key, value) {
        if (key === 'Enter') {
            const newId = generateUniqueID();
            const newItem = {
                id: newId,
                value: value,
                completed: false,
                priority: props.priority,
                time: serverTimestamp()
            };
            setDoc(doc(props.db, props.collectionName, props.currentListId, subCollectionName, newId), newItem);
        }
    }

    function handleEditItem(itemId, value, field) {
        setDoc(doc(props.db, props.collectionName, props.currentListId, subCollectionName, itemId),
            {[field]: value}, {merge: true});
    }

    function handleChangeCompletedItems(item) {
        updateDoc(doc(props.db, props.collectionName, props.currentListId, subCollectionName, item.id), {completed: !item.completed});
    }

    return <>
        <button className={"add-collab-button"} onClick={props.onAddCollabPopUp}><FaUsers style={{verticalAlign: 'text-top'}}/> Collaborators</button>

        <br/><br/>
        <label htmlFor="completed-toggle" id="uncomplete">Hide completed</label> <input type="checkbox"
                                                                                        id="completed-toggle"
                                                                                        onChange={props.onCompletedToggle}
                                                                                        className="toggle"/>

        <br/>
        <div className="priority-buttons">
            <button className="order-priority" onClick={() => props.onOrderBy("priority")}>Priority
            </button>
            <button className="order-priority" onClick={() => props.onOrderBy("name")}>Name</button>
            <button className="order-priority" onClick={() => props.onOrderBy("time")}>Time</button>
        </div>

        <ListItemsNested data={props.completedToggle ? tasks.filter(i => !i.completed) : tasks}
                         onToggleEditItem={props.onToggleEditItem}
                         onChangeCompletedItems={handleChangeCompletedItems}
                         onGetListItemData={props.onGetListItemData}
                         onEditItem={props.onEditItem}
        />

        <button className="add-button" onClick={props.onAddPopUp}><FaPlus/> Add item</button>

        <br/><br/>
        {tasks.length !== 0 && !props.completedToggle &&
            <button id="delete" onClick={props.onDeleteCompletedPopUp}>Delete completed items</button>}

        {props.deleteListPopUp &&
            <DeleteListPopUp onDelete={handleDeleteList} onClose={props.onDeleteListPopUp}>Delete this
                list?</DeleteListPopUp>}

        {props.addPopUp && <AddPopUp onAddItem={handleAddItem}
                                     onClose={props.onAddPopUp}
                                     priority={props.priority}
                                     onSetPriority={props.onSetPriority}>
            <h4>New item</h4></AddPopUp>}

        {props.addCollabPopUp && <ManageCollaborators db={props.db}
                                                      onInitSharedWith={props.onInitSharedWith}
                                                      onAddCollabPopUp={props.onAddCollabPopUp}
                                                      collectionName={props.collectionName}
                                                      currentListId={props.currentListId}
                                                      sharedWith={props.sharedWithLocal}
                                                      onClose={props.onAddCollabPopUp}/>}


        {props.editPopUp && <EditPopUp onClose={props.onEditPopUp}
                                       onEditPriority={handleEditItem}
                                       onFinishEdit={handleEditItem}
                                       listItemData={props.listItemData}>
            <h4>Edit item</h4></EditPopUp>}

        {props.showDeleteAlert &&
            <DeleteCompletedAlert onClose={props.onDeleteCompletedPopUp} onDelete={handleDeleteCompleted}>
                <div>
                    Are you sure you want to delete all completed items?
                </div>
            </DeleteCompletedAlert>}
    </>

}

export default ListItems