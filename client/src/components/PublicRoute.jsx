import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

function PublicRoute({ children }) {
    if (localStorage.getItem('token')) {
        return <Navigate to='/patient'/>
    } else {
        return children
    }
}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PublicRoute