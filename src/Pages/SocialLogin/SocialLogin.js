import React, { useContext } from 'react';
import { setAuthToken } from '../../api/auth';
import { AuthContext } from '../../contexts/AuthProvider';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const user = result.user;
            console.log(user)
            setAuthToken(user)
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='pt-4'>
            <p className='text-center'>Social Login</p>
            <p className='text-center'>
                <button onClick={handleGoogleLogin} className='btn btn-ghost'>Google Login</button>
            </p>
        </div>
    );
};

export default SocialLogin;