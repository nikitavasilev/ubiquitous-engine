import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AdminGuard = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    // console.log('token from adminguard', token);
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();
   
    useEffect(() => {
        if (token == null) {
            navigate('/login', { replace: true });
        }
        //  else if (token) {
        //     navigate('/dashboard', { replace: true });
        // }
    }, [token]);
    return children;
};

AdminGuard.propTypes = {
    children: PropTypes.node
};

export default AdminGuard;
