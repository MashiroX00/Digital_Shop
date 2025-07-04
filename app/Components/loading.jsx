import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'
export default function Loading() {
    return(
        <span className="my-2">
            <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" size="2xl"/> Loading....
        </span>
    )
}