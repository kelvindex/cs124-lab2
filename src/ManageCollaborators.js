import Collaborator from "./Collaborator";

function ManageCollaborators(props) {
    return <div className="backdrop" onClick={props.onClose}>
        <div className="collab-modal">
            <div className={"collab-modal-content"}>
                {props.children}

                <div className={"collaborators-container"}>
                    <ul className={"collaborators"}>
                        {props.sharedWith.map(p =>
                            <Collaborator
                                email={p}
                            />
                        )}
                    </ul>
                </div>

                <br/>
                <label id="addItem">
                    <input type="email" className="inputItem" placeholder="helper@domain.com"
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