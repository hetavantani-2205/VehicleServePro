import { useState } from "react";

export default function Billing() {
  const [items, setItems] = useState([
    { name: "", price: "", qty: 1 }
  ]);

  const[gst,setGst] = useState(18);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", qty: 1 }]);
  };

  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0
  );

  const gstAmount = (total * gst) / 100;
  const grandtotal = total + gstAmount;


  return (
    <div className="billing-wrapper">
      <div className="billing-card">
        <h2>Billing System</h2>

        <input placeholder="Customer Name" />
        <input placeholder="Vehicle Number" />

        <h4>Services</h4>

        {items.map((item, index) => (
          <div className="bill-row" key={index}>
            <input
              placeholder="Service Name"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => handleChange(index, "qty", e.target.value)}
            />
          </div>
        ))}

        <button onClick={addItem}>+ Add Service</button>

        <div className="bill-summary">
          <div>
            <span>Subtotal:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div>
            <span>GST (%):</span>
            <input
              type="number"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              className="gst-input"
            />
          </div>

          <div>
            <span>GST Amount:</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>

          <hr />

          <div className="total">
            <span>Total Payable:</span>
            <span>₹{grandtotal.toFixed(2)}</span>
          </div>
      </div>
    </div>
    </div>
    
  );
}
