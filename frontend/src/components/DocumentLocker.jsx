import React, { useState, useRef } from "react";

const DocumentLocker = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Insurance Policy", expiry: "2026-05-12", status: "ACTIVE" },
    { id: 2, name: "PUC Certificate", expiry: "2026-02-15", status: "EXPIRING SOON" },
  ]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        expiry: "Not Set",
        status: "RECENTLY UPLOADED",
        url: URL.createObjectURL(file) 
      };

      setDocuments([...documents, newDoc]);
      alert(`Successfully uploaded: ${file.name}`);
    }
  };

  return (
    <div className="locker-card">
      <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        📁 Digital Document Locker
      </h3>

      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc.id} className="doc-item" style={{ 
            borderLeft: doc.status === "EXPIRING SOON" ? "4px solid #f1c40f" : "4px solid #1e90ff",
            background: "#fdfdfd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.02)"
          }}>
            <div>
              <strong>{doc.name}</strong>
              <p style={{ margin: "5px 0 0", fontSize: "0.85rem", color: "#666" }}>
                Expires on: {doc.expiry}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {doc.url && (
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#1e90ff",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    border: "1px solid #1e90ff",
                    borderRadius: "4px"
                  }}
                >
                  View File
                </a>
              )}
              
              <span style={{ 
                fontSize: "0.75rem", 
                fontWeight: "bold", 
                color: doc.status === "ACTIVE" ? "#2ecc71" : (doc.status === "EXPIRING SOON" ? "#e67e22" : "#95a5a6")
              }}>
                {doc.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.jpg,.png,.doc"
      />

      <button 
        onClick={handleButtonClick}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#0a3d62",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        + Upload New Document
      </button>
    </div>
  );
};

export default DocumentLocker;