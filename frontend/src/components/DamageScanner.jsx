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
        setResults([]); // Clear previous results
        const base64Data = image.split(',')[1]; 

        try {
            const response = await fetch("https://vehicleservepro.onrender.com/api/scan", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageBase64: base64Data })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Backend request failed');
            }

            const result = await response.json();
            
            
            const aiResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiResponseText) {
                try {
              
                    const cleanJson = aiResponseText.replace(/```json|```/g, "").trim();
                    const parsedData = JSON.parse(cleanJson);
                    
                  
                    setResults(Array.isArray(parsedData) ? parsedData : [parsedData]);
                } catch (parseError) {
                    console.error("Failed to parse AI JSON:", aiResponseText);
                    // Fallback: If parsing fails, show the raw text as a single result
                    setResults([{ name: "Analysis Result", value: 1.0, description: aiResponseText }]);
                }
            } else {
                alert("AI could not identify the image content.");
            }

        } catch (error) {
            console.error('AI Scan Error:', error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#0a3d62' }}>Gemini AI Damage Scanner</h2>
            <div style={uploadBox}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Preview" style={previewStyle} />}
            </div>
            
            <button 
                onClick={scanImage} 
                style={btnStyle} 
                disabled={loading}
            >
                {loading ? "AI is Analyzing Parts..." : "Launch AI Inspection"}
            </button>

            {results.length > 0 && (
                <div style={resultBox}>
                    <h4 style={{marginTop: 0}}>Scan Report:</h4>
                    {results.map((item, index) => (
                        <div key={index} style={conceptItem}>
                            <div>
                                <div style={{fontWeight: '600', color: '#2c3e50'}}>{item.name}</div>
                                {item.description && <small style={{color: '#7f8c8d'}}>{item.description}</small>}
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <span style={{color: '#27ae60', fontWeight: 'bold'}}>
                                    {(item.value * 100).toFixed(0)}%
                                </span>
                                <div style={progressBarContainer}>
                                    <div style={{...progressBar, width: `${item.value * 100}%`}}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const containerStyle = { padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', margin: '20px auto', maxWidth: '600px' };
const uploadBox = { margin: '20px 0', border: '2px dashed #0a3d62', padding: '20px', borderRadius: '10px' };
const previewStyle = { width: '100%', marginTop: '15px', borderRadius: '8px', maxHeight: '300px', objectFit: 'contain' };
const btnStyle = { background: '#27ae60', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s', width: '100%' };
const resultBox = { marginTop: '20px', textAlign: 'left', background: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #e1e4e8' };
const conceptItem = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #ddd' };
const progressBarContainer = { width: '100px', height: '8px', background: '#ecf0f1', borderRadius: '5px', marginTop: '5px' };
const progressBar = { height: '100%', background: '#27ae60', borderRadius: '5px' };

export default DamageScanner;