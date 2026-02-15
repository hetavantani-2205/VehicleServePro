import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function Billing({ user }) {
  const [items, setItems] = useState([{ name: "", price: "", qty: 1 }]);
  const [gst, setGst] = useState(18);
  const [upiQR, setUpiQR] = useState("");

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

  const generateUpiQR = async () => {
    const amount = grandtotal.toFixed(2);
    const upiUrl = `upi://pay?pa=hetav.antani-1@oksbi&pn=VehicleServePro&am=${amount}&cu=INR&tn=Vehicle%20Service%20Bill`;
    const qr = await QRCode.toDataURL(upiUrl);
    setUpiQR(qr);
  };

  return (
    <div className="billing-wrapper">
      {/* 1. VEHICLE SERVICE BILL SECTION - ONLY VISIBLE TO ADMIN */}
      {user?.role === "ADMIN" && (
        <div className="billing-card" id="bill-area" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
          <h2>Vehicle Service Bill</h2>
          <input placeholder="Customer Name" style={{ marginBottom: '10px', display: 'block' }} />
          <input placeholder="Vehicle Number" style={{ marginBottom: '10px', display: 'block' }} />

          <h4>Services</h4>
          {items.map((item, index) => (
            <div className="bill-row" key={index} style={{ marginBottom: '10px' }}>
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

          <button onClick={addItem} style={{ marginBottom: '20px' }}>+ Add Service</button>

          <div className="bill-summary">
            <div><span>Subtotal: </span><span>₹{total.toFixed(2)}</span></div>
            <div>
              <span>GST (%): </span>
              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                style={{ width: '50px' }}
              />
            </div>
            <div><span>GST Amount: </span><span>₹{gstAmount.toFixed(2)}</span></div>
            <hr />
            <div className="total" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
              <span>Total Payable: </span>
              <span>₹{grandtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOMER ACTION BUTTONS - ONLY VISIBLE TO CUSTOMER */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {user?.role === "CUSTOMER" ? (
          <>
            <button 
              onClick={downloadPDF} 
              style={{ padding: '10px 20px', background: '#0a3d62', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Download Invoice PDF
            </button>

            <button 
              onClick={generateUpiQR} 
              style={{ marginLeft: "10px", padding: '10px 20px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Pay Now (Scan QR)
            </button>

            {upiQR && (
              <div style={{ marginTop: "15px", border: '1px solid #eee', display: 'inline-block', padding: '10px' }}>
                <p>Scan using any UPI app</p>
                <img src={upiQR} width="220" alt="UPI QR" />
              </div>
            )}
          </>
        ) : (
          user?.role !== "ADMIN" && <p>Please log in as a Customer to make payments.</p>
        )}
      </div>
    </div>
  );
}