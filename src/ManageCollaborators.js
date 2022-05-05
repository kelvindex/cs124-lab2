import Collaborator from "./Collaborator";
import {FaUsersCog} from "react-icons/fa";

function ManageCollaborators(props) {
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
                            />
                        )}
                    </ul>
                </div>

                <br/>
                <label id="addItem">
                    <input type="email" className="inputItem" placeholder="add collaborator"
                           onClick={(e) => e.stopPropagation()}
                           onKeyPress={(e) => {
                               props.onAddCollab(e.key, e.target.value);
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