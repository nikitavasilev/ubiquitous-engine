import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const UserGuard = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
   
    useEffect(() => {
        if (token == null) {
            navigate('/home', { replace: true });
        }
        // else if (token && user?.role=="User" ) {
        //     navigate('/landingPage', { replace: true });
        // }
    }, [token]);
    
    return children;
};

UserGuard.propTypes = {
    children: PropTypes.node
};

export default UserGuard;
