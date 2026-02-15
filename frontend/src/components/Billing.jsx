import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Billing({ user }) {
  const [items, setItems] = useState([{ name: "", price: "", qty: 1 }]);
  const [gst, setGst] = useState(18);

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

  const downloadPDF = () => {
    const bill = document.getElementById("bill-area");
    if (!bill) {
      alert("No bill content to download!");
      return;
    }

    html2canvas(bill, {
      scale: 2,
      useCORS: true,
      windowWidth: bill.scrollWidth
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("VehicleServePro_Invoice.pdf");
    });
  };

 
  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not found. Please add the script to your index.html");
      return;
    }

    const options = {
      key: "rzp_test_SGIih6cP2nRxni",
      amount: Math.round(grandtotal * 100), 
      currency: "INR",
      name: "VehicleServePro",
      description: "Vehicle Service Payment",
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
  
        downloadPDF();
      },
      prefill: {
        name: user?.name || "Customer",
        email: user?.email || "customer@example.com",
      },
      theme: {
        color: "#0a3d62",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="billing-wrapper">
      {/* 1. EDITABLE VERSION - ONLY FOR ADMIN */}
      {user?.role === "ADMIN" && (
        <div className="billing-card" id="bill-area">
          <h2>Vehicle Service Bill</h2>
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
            <div><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
            <div>
              <span>GST (%)</span>
              <input type="number" value={gst} onChange={(e) => setGst(e.target.value)} />
            </div>
            <div><span>GST Amount</span><span>₹{gstAmount.toFixed(2)}</span></div>
            <hr />
            <div className="total">
              <span>Total Payable</span>
              <span>₹{grandtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. READ-ONLY HIDDEN VERSION - FOR CUSTOMER (Used for PDF generation) */}
      {user?.role === "CUSTOMER" && (
        <div id="bill-area" style={{ position: "absolute", left: "-9999px", top: "0", background: "white", padding: "40px", width: "800px" }}>
          <h2 style={{ textAlign: 'center', color: '#0a3d62' }}>VehicleServePro Official Invoice</h2>
          <hr />
          <p><strong>Customer Name:</strong> {user?.name || "Valued Customer"}</p>
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Service</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Price</th>
                <th style={{ textAlign: 'center', padding: '10px' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{item.name || "Service"}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>₹{Number(item.price).toFixed(2)}</td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>₹{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <p>Subtotal: ₹{total.toFixed(2)}</p>
            <p>GST ({gst}%): ₹{gstAmount.toFixed(2)}</p>
            <h3 style={{ color: '#0a3d62' }}>Grand Total: ₹{grandtotal.toFixed(2)}</h3>
          </div>
        </div>
      )}

      {/* 3. VISIBLE BUTTONS FOR CUSTOMER */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {user?.role === "CUSTOMER" && (
          <>
            <button onClick={downloadPDF} style={{ padding: '10px 20px', background: '#0a3d62', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Download Invoice PDF
            </button>
            <button onClick={handlePayment} style={{ marginLeft: "10px", padding: '10px 20px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              💳 Pay Now (Razorpay)
            </button>
          </>
        )}
      </div>
    </div>
  );
}