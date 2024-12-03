// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import '../styles/Auth.css';

// const AuthPage = () => {
//     const [isSignup, setIsSignup] = useState(true);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate

//     const toggleAuthMode = () => {
//         setIsSignup((prev) => !prev);
//         setError('');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         const endpoint = isSignup
//             ? 'http://localhost:8080/api/customers/signup'
//             : 'http://localhost:8080/api/auth/login';

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: isSignup ? formData.username : undefined,
//                     email: formData.email,
//                     password: formData.password,
//                 }),
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong!');
//             }

//             // Redirect to Upload.jsx after success
//             navigate('/upload');
//         } catch (err) {
//             setError(err.message || 'An error occurred.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-card">
//                 <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {isSignup && (
//                         <div className="auth-form-group">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 placeholder="Enter your username"
//                                 required
//                             />
//                         </div>
//                     )}
//                     <div className="auth-form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="auth-form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             required
//                             minLength={6}
//                         />
//                     </div>
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <div className="auth-buttons">
//                         <button type="submit" className="btn btn-primary">
//                             {isSignup ? 'Sign Up' : 'Log In'}
//                         </button>
//                         <button
//                             type="button"
//                             className="btn btn-secondary"
//                             onClick={toggleAuthMode}
//                         >
//                             {isSignup ? 'Switch to Log In' : 'Switch to Sign Up'}
//                         </button>
//                     </div>
//                 </form>
//                 <div className="auth-footer">
//                     By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Auth.css';

// const AuthPage = () => {
//     const [isSignup, setIsSignup] = useState(true);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState('');
//     const [isFacebookLoggedIn, setIsFacebookLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     // Initialize Facebook SDK
//     useEffect(() => {
//         window.fbAsyncInit = function () {
//             window.FB.init({
//                 appId: '1108837231243670', // Replace with your Facebook App ID
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v12.0',
//             });

//             console.log('Facebook SDK Initialized');
//             // Check if the user is already logged in to Facebook
//             window.FB.getLoginStatus(function (response) {
//                 console.log('Facebook login status:', response);
//                 if (response.status === 'connected') {
//                     setIsFacebookLoggedIn(true);
//                 }
//             });
//         };

//         // Load the Facebook SDK
//         (function (d, s, id) {
//             var js,
//                 fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) return;
//             js = d.createElement(s);
//             js.id = id;
//             js.src = 'https://connect.facebook.net/en_US/sdk.js';
//             fjs.parentNode.insertBefore(js, fjs);
//         })(document, 'script', 'facebook-jssdk');
//     }, []);

//     const toggleAuthMode = () => {
//         setIsSignup((prev) => !prev);
//         setError('');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         const endpoint = isSignup
//             ? 'http://localhost:8080/api/customers/signup'
//             : 'http://localhost:8080/api/auth/login';

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: isSignup ? formData.username : undefined,
//                     email: formData.email,
//                     password: formData.password,
//                 }),
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong!');
//             }

//             // Redirect to Upload page after success
//             navigate('/upload');
//         } catch (err) {
//             setError(err.message || 'An error occurred.');
//         }
//     };

//     const handleFacebookLogin = () => {
//         console.log('Attempting Facebook login');
//         window.FB.login(
//             function (response) {
//                 console.log('Facebook login response:', response);
//                 if (response.authResponse) {
//                     fetchFacebookPhotos(response.authResponse.accessToken);
//                 } else {
//                     setError('Facebook login failed.');
//                 }
//             },
//             { scope: 'public_profile,email,user_photos' }
//         );
//     };

//     const fetchFacebookPhotos = (accessToken) => {
//         console.log('Fetching Facebook photos with access token:', accessToken);
//         window.FB.api(
//             '/me/photos?type=uploaded',
//             'GET',
//             { access_token: accessToken },
//             function (response) {
//                 console.log('Fetched Facebook photos:', response);
//                 if (response && !response.error) {
//                     navigate('/photos', { state: { photos: response.data } });
//                 } else {
//                     setError('Failed to fetch Facebook photos.');
//                 }
//             }
//         );
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-card">
//                 <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {isSignup && (
//                         <div className="auth-form-group">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 placeholder="Enter your username"
//                                 required
//                             />
//                         </div>
//                     )}
//                     <div className="auth-form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="auth-form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             required
//                             minLength={6}
//                         />
//                     </div>
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <div className="auth-buttons">
//                         <button type="submit" className="btn btn-primary">
//                             {isSignup ? 'Sign Up' : 'Log In'}
//                         </button>
//                         <button
//                             type="button"
//                             className="btn btn-secondary"
//                             onClick={toggleAuthMode}
//                         >
//                             {isSignup ? 'Switch to Log In' : 'Switch to Sign Up'}
//                         </button>
//                     </div>
//                 </form>
//                 {!isFacebookLoggedIn && (
//                     <button
//                         type="button"
//                         className="btn btn-facebook"
//                         onClick={handleFacebookLogin}
//                     >
//                         Log In with Facebook
//                     </button>
//                 )}
//                 <div className="auth-footer">
//                     By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import '../styles/Auth.css';

// const AuthPage = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as a prop
//     const [isSignup, setIsSignup] = useState(true);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate

//     const toggleAuthMode = () => {
//         setIsSignup((prev) => !prev);
//         setError('');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         const endpoint = isSignup
//             ? 'http://localhost:8080/api/customers/signup'
//             : 'http://localhost:8080/api/auth/login';

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: isSignup ? formData.username : undefined,
//                     email: formData.email,
//                     password: formData.password,
//                 }),
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong!');
//             }

//             // Set the isLoggedIn state to true upon successful login/signup
//             setIsLoggedIn(true);

//             // Redirect to Upload page after successful login/signup
//             navigate('/upload');
//         } catch (err) {
//             setError(err.message || 'An error occurred.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-card">
//                 <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {isSignup && (
//                         <div className="auth-form-group">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 placeholder="Enter your username"
//                                 required
//                             />
//                         </div>
//                     )}
//                     <div className="auth-form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="auth-form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             required
//                             minLength={6}
//                         />
//                     </div>
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <div className="auth-buttons">
//                         <button type="submit" className="btn btn-primary">
//                             {isSignup ? 'Sign Up' : 'Log In'}
//                         </button>
//                         <button
//                             type="button"
//                             className="btn btn-secondary"
//                             onClick={toggleAuthMode}
//                         >
//                             {isSignup ? 'Switch to Log In' : 'Switch to Sign Up'}
//                         </button>
//                     </div>
//                 </form>
//                 <div className="auth-footer">
//                     By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Auth.css';

const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [imageBuddyData, setImageBuddyData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isImageBuddyLogin, setIsImageBuddyLogin] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleAuthMode = () => {
        setIsSignup((prev) => !prev);
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isImageBuddyLogin) {
            setImageBuddyData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageBuddyLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5050/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: imageBuddyData.email,
                    password: imageBuddyData.password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            // Fetch images from ImageBuddy and pass them to Cloud Vision API
            const images = data.images; // Assume the response contains images
            console.log(images);
            // Redirect to upload page or another page where the images are processed
            navigate('/photos', { state: { images } });

        } catch (err) {
            setError(err.message || 'An error occurred during ImageBuddy login.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isSignup
            ? 'http://localhost:8080/api/customers/signup'
            : 'http://localhost:8080/api/auth/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: isSignup ? formData.username : undefined,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            // Redirect to Upload.jsx after success
            navigate('/upload');
        } catch (err) {
            setError(err.message || 'An error occurred.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
                <form onSubmit={isImageBuddyLogin ? handleImageBuddyLogin : handleSubmit}>
                    {isImageBuddyLogin ? (
                        <>
                            <div className="auth-form-group">
                                <label htmlFor="email">ImageBuddy Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={imageBuddyData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your ImageBuddy email"
                                    required
                                />
                            </div>
                            <div className="auth-form-group">
                                <label htmlFor="password">ImageBuddy Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={imageBuddyData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your ImageBuddy password"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {isSignup && (
                                <div className="auth-form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            )}
                            <div className="auth-form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="auth-form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="auth-buttons">
                        <button type="submit" className="btn btn-primary">
                            {isImageBuddyLogin ? 'Login with ImageBuddy' : isSignup ? 'Sign Up' : 'Log In'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={toggleAuthMode}
                        >
                            {isImageBuddyLogin
                                ? 'Switch to Default Login'
                                : isSignup
                                    ? 'Switch to Log In'
                                    : 'Switch to Sign Up'}
                        </button>
                        {!isImageBuddyLogin && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsImageBuddyLogin(true)}
                            >
                                Login with ImageBuddy
                            </button>
                        )}
                    </div>
                </form>
                <div className="auth-footer">
                    By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
