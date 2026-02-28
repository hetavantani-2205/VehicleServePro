import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Billing({ user }) {
  const [items, setItems] = useState([]);
  const [gst, setGst] = useState(18);
  const [showPopup, setShowPopup] = useState(false);
  const [services, setServices] = useState([
  { id: 1, name: "Oil Change", price: 1200 },
  { id: 2, name: "Brake Inspection", price: 800 },
  { id: 3, name: "Wheel Alignment", price: 1500 },
  { id: 4, name: "Battery Check", price: 500 },
]);

 const toggleService = (service) => {
  const exists = items.find((item) => item.id === service.id);

  if (exists) {
    setItems(items.filter((item) => item.id !== service.id));
  } else {
    setItems([...items, { ...service, qty: 1 }]);
  }
};

  const total = items.reduce(
    (sum, item) => sum + item.price *
    item.qty,
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
         {services.map((service) => (
  <div key={service.id} style={{ marginBottom: "8px" }}>
    <input
      type="checkbox"
      checked={items.some((item) => item.id === service.id)}
      onChange={() => toggleService(service)}
    />
    <span style={{ marginLeft: "8px" }}>
      {service.name} - ₹{service.price}
    </span>
  </div>
))}
        
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
    {items.map((item) => (
      <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{ padding: '10px' }}>{item.name}</td>
        <td style={{ textAlign: 'right', padding: '10px' }}>₹{item.price}</td>
        <td style={{ textAlign: 'center', padding: '10px' }}>{item.qty}</td>
        <td style={{ textAlign: 'right', padding: '10px' }}>
          ₹{(item.price * item.qty).toFixed(2)}
        </td>
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
            <button onClick={() => setShowPopup(true)} className="invoice-btn"> 
              Download Invoice PDF
            </button>
            <button onClick={handlePayment}
            className="payment-btn">
              💳 Pay Now (Razorpay)
            </button>
          </>
        )}
      </div>
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>🚧 Feature in Development</h3>
      <p>
        Invoice download feature is currently under development.
        It will be available in the next update.
      </p>
      <button
        onClick={() => setShowPopup(false)}
        className="popup-close"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}