import Collaborator from "./Collaborator";
import {FaUsersCog} from "react-icons/fa";
import {useEffect} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {NotificationManager} from "react-notifications";

function ManageCollaborators(props) {
    useEffect(() => {
        async function fetchSharedWithData() {
            const result = await getDoc(doc(props.db, props.collectionName, props.currentListId));
            props.onInitSharedWith(result.data().sharedWith);
        }

        fetchSharedWithData();
    })

    function handleAddCollab(key, email) {

        if (key === 'Enter') {
            if (props.sharedWith.indexOf(email) !== -1) {
                NotificationManager.error("List already shared with " + email, "Failed to share", 3000);
            } else {
                updateDoc(doc(props.db, props.collectionName, props.currentListId), {sharedWith: [...props.sharedWith, email]});
                NotificationManager.success("New member: " + email, "Collaborator added", 3000);
                props.onAddCollabPopUp();

            }
        }
    }
    return <div className="backdrop" onClick={props.onClose}>
        <div className="collab-modal">
            <div className={"collab-modal-content"}>

                <div className={"modal-header"}>
                    <FaUsersCog style={{fontSize:'15pt', verticalAlign: 'text-bottom'}}/> <h3>Collaborators</h3>
                </div>
                <div className={"collaborators-container"}>

                    <ul className={"collaborators"}>
                        {props.sharedWith.map(p =>
                            <Collaborator
                                key={p}
                                email={p}
                                onRemoveCollab={props.onRemoveCollab}
                                ownerEmail={props.ownerEmail}
                            />
                        )}
                    </ul>
                </div>

                <br/>
                <label id="addItem">
                    <input type="email" className="inputItem" placeholder="add collaborator"
                           onClick={(e) => e.stopPropagation()}
                           onKeyPress={(e) => {
                               handleAddCollab(e.key, e.target.value);
                               if (e.key === 'Enter') {
                                   e.target.value = ""
                               }
                           }}/>
                </label>

                <br/> <br/>

                <div className="add-popup-buttons">
                    <button className={"alert-button alert-ok"} type={"button"}
                            onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ManageCollaborators;