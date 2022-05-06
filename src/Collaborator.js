import {FaUserCircle, FaTrash} from "react-icons/fa";

function Collaborator(props) {
    const isOwner = props.ownerEmail === props.email;

    return <div className={"collaborator"}><FaUserCircle
        style={{marginRight: '.75em', fontSize: '14pt', verticalAlign: 'text-top'}}/>
        <label>{props.email}</label>
        {!isOwner && <button className="edit-button remove-collab-button" onClick={props.onRemoveCollab}><FaTrash
            style={{fontSize: '9pt'}}
            aria-label={"Remove " + (props.email ? props.email : "collaborator") + "from this project"}/></button>
        }
    </div>
}

export default Collaborator;