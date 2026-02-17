import React, { useState } from 'react';

const DamageScanner = () => {
    const [image, setImage] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const scanImage = async () => {
        if (!image) return alert("Please upload an image first!");
        
        setLoading(true);
        const base64Data = image.split(',')[1];

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": meta.env.REACT_APP_CLARIFAI_USER_ID,
                "app_id": meta.env.REACT_APP_CLARIFAI_APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": { "base64": base64Data }
                    }
                }
            ]
        });

        try {
            const response = await fetch(
                "https://api.clarifai.com/v2/models/vehicle-detection/outputs",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Key ' + meta.env.REACT_APP_CLARIFAI_API_KEY
                    },
                    body: raw
                }
            );

            const result = await response.json();
            
            setResults(result.outputs[0].data.concepts || []);
        } catch (error) {
            console.error('AI Scan Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#0a3d62' }}>AI Visual Damage Scanner</h2>
            <div style={uploadBox}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Preview" style={previewStyle} />}
            </div>
            
            <button 
                onClick={scanImage} 
                style={btnStyle} 
                disabled={loading}
            >
                {loading ? "Neural Network Scanning..." : "Launch AI Inspection"}
            </button>

            {results.length > 0 && (
                <div style={resultBox}>
                    <h4>Scan Report:</h4>
                    {results.map((concept) => (
                        <div key={concept.id} style={conceptItem}>
                            <span>{concept.name}</span>
                            <span>{(concept.value * 100).toFixed(2)}% Confidence</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const containerStyle = { padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', margin: '20px auto', maxWidth: '600px' };
const uploadBox = { margin: '20px 0', border: '2px dashed #0a3d62', padding: '20px', borderRadius: '10px' };
const previewStyle = { width: '100%', marginTop: '15px', borderRadius: '8px' };
const btnStyle = { background: '#27ae60', color: '#white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const resultBox = { marginTop: '20px', textAlign: 'left', background: '#f8f9fa', padding: '15px', borderRadius: '8px' };
const conceptItem = { display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #ddd' };

export default DamageScanner;