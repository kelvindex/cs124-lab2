import {FaUserCircle} from "react-icons/fa";

function Collaborator(props) {

    return <div className={"item-value collaborator"}><FaUserCircle
        style={{marginRight: '.75em', fontSize: '14pt', verticalAlign: 'text-top'}}/>
        {props.email}
    </div>
}

export default Collaborator;