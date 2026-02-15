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
    {/* 1. EDITABLE VERSION - ONLY FOR ADMIN */}
    {user?.role === "ADMIN" && (
      <div className="billing-card" id="bill-area">
        <h2>Vehicle Service Bill</h2>
        {/* ... your existing inputs and 'Add Service' button ... */}
      </div>
    )}

    {/* 2. READ-ONLY HIDDEN VERSION - FOR CUSTOMER (Used for PDF generation) */}
    {user?.role === "CUSTOMER" && (
      <div id="bill-area" style={{ position: "absolute", left: "-9999px", top: "0", background: "white", padding: "40px", width: "800px" }}>
        <h2 style={{ textAlign: 'center', color: '#0a3d62' }}>VehicleServePro Official Invoice</h2>
        <hr />
        <p><strong>Customer Name:</strong> {document.querySelector('input[placeholder="Customer Name"]')?.value || "Valued Customer"}</p>
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
          <button onClick={downloadPDF} style={{ padding: '10px 20px', background: '#0a3d62', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Download Invoice PDF
          </button>
          <button onClick={generateUpiQR} style={{ marginLeft: "10px", padding: '10px 20px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Pay Now (Scan QR)
          </button>
          {upiQR && (
            <div style={{ marginTop: "15px" }}>
              <img src={upiQR} width="200" alt="QR" />
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
}