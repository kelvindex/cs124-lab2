import {FaUserCircle} from "react-icons/fa";

function Collaborator(props) {

    return <div className={"collaborator"}> <FaUserCircle style={{marginRight:'.75em', fontSize:'14pt', verticalAlign:'text-top'}}/>
        {props.email}
    </div>
}

export default Collaborator;