import React, { useEffect, useState } from "react";

const Box = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const result = await response.json();
        setCards(result.dashboard_summary);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null; // Or a ghost loader

  return (
    <> {/* <--- USE A FRAGMENT, NOT A DIV */}
      {cards.map((card, index) => (
        <div key={index} style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          borderTop: `5px solid ${
            card.title.includes("BALANCE") ? "#6366f1" : 
            card.title.includes("INCOME") ? "#10b981" : 
            card.title.includes("EXPENSES") ? "#f43f5e" : "#f59e0b"
          }`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '150px'
        }}>
          <h4 style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            {card.title}
          </h4>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            color: card.title.includes("INCOME") ? "#10b981" : card.title.includes("EXPENSES") ? "#f43f5e" : "#1e293b",
            margin: '0'
          }}>
            {card.value}
          </h2>
          
          {card.subtitle && <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{card.subtitle}</p>}
          
          {card.trend && (
            <div style={{ 
              fontSize: '13px', 
              color: card.trend.direction === 'down' ? '#f43f5e' : '#10b981',
              marginTop: '8px',
              fontWeight: '600'
            }}>
              {card.trend.direction === 'down' ? '↓' : '↑'} {card.trend.percentage}
              <span style={{ color: '#94a3b8', fontWeight: '400' }}> last month</span>
            </div>
          )}

          {card.progress_bar_percentage && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px' }}>
                <div style={{ width: `${card.progress_bar_percentage}%`, height: '100%', background: '#f59e0b', borderRadius: '10px' }} />
              </div>
              <p style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>✓ {card.status}</p>
            </div>
          )}
        </div>
      ))}
    </> 
  );
};

export default Box;