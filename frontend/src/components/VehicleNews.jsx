import { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";

function VehicleNews() {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchNews = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/vehicle`);
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(fetchNews, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-container">
      <h2>🚗 Vehicle Service News</h2>

      <div className="news-grid">
        {news.map((item, index) => (
          <div
            key={index}
            className="news-card"
            onClick={() => setSelected(item)}
          >
            <img src={item.urlToImage || "/default.jpg"} alt="" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.title}</h2>
            <img src={selected.urlToImage} alt="" />
            <p>{selected.content}</p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleNews;