// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Photos.css';

// const PhotosPage = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [analysisTitle, setAnalysisTitle] = useState('');
//     const [analysisStory, setAnalysisStory] = useState('');
//     const location = useLocation(); // To get images passed via navigation
//     const navigate = useNavigate();

//     // Retrieve the images passed via the navigate state (from the previous page)
//     useEffect(() => {
//         if (location.state && location.state.images) {
//             setImages(location.state.images);
//         } else {
//             // If images are not found in state, redirect to login or other page
//             navigate('/login');
//         }
//     }, [location.state, navigate]);

//     const handleAnalyzeImage = async (imageUrl) => {
//         console.log(imageUrl);
//         if (!imageUrl) {
//             alert('Image URL is missing!');
//             return;
//         }

//         try {
//             setLoading(true);
//             // Send the image URL to the backend for analysis
//             const response = await axios.post('http://localhost:8000/api/upload2', {
//                 url: imageUrl,
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Set the title and story from the response
//             setAnalysisTitle(response.data.title);
//             setAnalysisStory(response.data.story);
//         } catch (error) {
//             console.error('Error analyzing image:', error);
//             setAnalysisTitle('Analysis Failed');
//             setAnalysisStory('Failed to analyze the image.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="photos-container">
//             <h2>Photos</h2>
//             <div className="photos-grid">
//                 {images.length === 0 ? (
//                     <p>No images found.</p>
//                 ) : (
//                     images.map((image) => (
//                         <div key={image._id} className="photo-card">
//                             <img
//                                 src={image.url}
//                                 alt="User Image"
//                                 className="photo-image"
//                             />
//                             <div className="photo-actions">
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => handleAnalyzeImage(image.url)}
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Analyzing...' : 'Analyze Image'}
//                                 </button>
//                             </div>
//                             {analysisTitle && (
//                                 <div className="analysis-result">
//                                     <h3>{analysisTitle}</h3>
//                                     <p>{analysisStory}</p>
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PhotosPage;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Photos.css';

// const PhotosPage = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [analysisTitle, setAnalysisTitle] = useState('');
//     const [analysisStory, setAnalysisStory] = useState('');
//     const location = useLocation(); // To get images passed via navigation
//     const navigate = useNavigate();

//     // Retrieve the images passed via the navigate state (from the previous page)
//     useEffect(() => {
//         if (location.state && location.state.images) {
//             setImages(location.state.images);
//         } else {
//             // If images are not found in state, redirect to login or other page
//             navigate('/login');
//         }
//     }, [location.state, navigate]);

//     const handleAnalyzeImage = async (imageUrl) => {
//         console.log(imageUrl);
//         if (!imageUrl) {
//             alert('Image URL is missing!');
//             return;
//         }

//         try {
//             setLoading(true);
//             // Send the image URL to the backend for analysis
//             const response = await axios.post('http://localhost:8000/api/upload2', {
//                 imageUrl, // Ensure that the backend expects this key
//             });

//             // Set the title and story from the response
//             setAnalysisTitle(response.data.title);
//             setAnalysisStory(response.data.story);
//         } catch (error) {
//             console.error('Error analyzing image:', error);
//             setAnalysisTitle('Analysis Failed');
//             setAnalysisStory('Failed to analyze the image.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="photos-container">
//             <h2>Photos</h2>
//             <div className="photos-grid">
//                 {images.length === 0 ? (
//                     <p>No images found.</p>
//                 ) : (
//                     images.map((image) => (
//                         <div key={image._id} className="photo-card">
//                             <img
//                                 src={image.url}
//                                 alt="User Image"
//                                 className="photo-image"
//                             />
//                             <div className="photo-actions">
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => handleAnalyzeImage(image.url)}
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Analyzing...' : 'Analyze Image'}
//                                 </button>
//                             </div>
//                             {analysisTitle && (
//                                 <div className="analysis-result">
//                                     <h3>{analysisTitle}</h3>
//                                     <p>{analysisStory}</p>
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PhotosPage;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Photos.css';

const PhotosPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [analysisTitle, setAnalysisTitle] = useState('');
    const [analysisStory, setAnalysisStory] = useState('');
    const location = useLocation(); // To get images passed via navigation
    const navigate = useNavigate();

    // Retrieve the images passed via the navigate state (from the previous page)
    useEffect(() => {
        if (location.state && location.state.images) {
            setImages(location.state.images);
        } else {
            // If images are not found in state, redirect to login or other page
            navigate('/login');
        }
    }, [location.state, navigate]);

    const handleAnalyzeImage = async (imageUrl) => {
        console.log(imageUrl);
        if (!imageUrl) {
            alert('Image URL is missing!');
            return;
        }

        try {
            setLoading(true);
            // Send the image URL to the backend for analysis
            const response = await axios.post('http://localhost:8000/api/upload2', {
                base64Image: imageUrl, // Ensure that the backend expects this key
            });

            // Set the title and story from the response
            setAnalysisTitle(response.data.title);
            setAnalysisStory(response.data.story);
        } catch (error) {
            console.error('Error analyzing image:', error);
            setAnalysisTitle('Analysis Failed');
            setAnalysisStory('Failed to analyze the image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="photos-container">
            <h2>Photos</h2>
            <div className="photos-grid">
                {images.length === 0 ? (
                    <p>No images found.</p>
                ) : (
                    images.map((image) => (
                        <div key={image._id} className="photo-card">
                            <img
                                src={image.url}
                                alt="User Image"
                                className="photo-image"
                            />
                            <div className="photo-actions">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAnalyzeImage(image.url)}
                                    disabled={loading}
                                >
                                    {loading ? 'Analyzing...' : 'Analyze Image'}
                                </button>
                            </div>
                            {analysisTitle && (
                                <div className="analysis-result">
                                    <h3>{analysisTitle}</h3>
                                    <p>{analysisStory}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PhotosPage;

