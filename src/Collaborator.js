import {FaUserCircle} from "react-icons/fa";

function Collaborator(props) {

    return <div className={"collaborator"}><FaUserCircle
        style={{marginRight: '.75em', fontSize: '14pt', verticalAlign: 'text-top'}}/>
        <label>{props.email}</label>
    </div>
}

export default Collaborator;