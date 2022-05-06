import {FaUserCircle, FaTrash} from "react-icons/fa";

function Collaborator(props) {
    const isOwner = props.ownerEmail === props.email;

    return <div className={"collaborator"}><FaUserCircle className={"column right"} id={props.email}
        style={{marginRight: '.75em', fontSize: '14pt', verticalAlign: 'text-top'}}/>

        <label className={"column middle"}>{props.email}</label>
        {!isOwner && <button className="edit-button remove-collab-button" onClick={() => props.onRemoveCollab(props.email)}><FaTrash
            style={{position: 'relative', top: '-2px', left: '22px', fontSize:'9pt', color: '#e67e00'}}
            aria-label={"Remove " + (props.email ? props.email : "collaborator") + "from this project"}/></button>
        }
    </div>
}

export default Collaborator;