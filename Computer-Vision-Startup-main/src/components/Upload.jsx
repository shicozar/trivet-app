import React, { useState } from 'react';
import axios from 'axios';

function ImageAnalyzer() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analysisTitle, setAnalysisTitle] = useState('');
    const [analysisStory, setAnalysisStory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setAnalysisTitle(''); // Reset title on new upload
            setAnalysisStory(''); // Reset story on new upload
        }
    };

    const handleAnalyzeImage = async () => {
        if (!image) {
            alert('Please upload an image before analyzing.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1>Image Mood Analyzer</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ margin: '10px 0' }}
            />

            {preview && (
                <div>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ width: '100%', marginTop: '10px', borderRadius: '5px' }}
                    />
                </div>
            )}

            <button
                onClick={handleAnalyzeImage}
                disabled={loading}
                style={{
                    margin: '10px 0',
                    padding: '10px 20px',
                    background: '#007BFF',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                {loading ? 'Analyzing...' : 'Analyze'}
            </button>

            {analysisTitle && analysisStory && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
                    <h3>{analysisTitle}</h3>
                    <p>{analysisStory}</p>
                </div>
            )}
        </div>
    );
}

export default ImageAnalyzer;


