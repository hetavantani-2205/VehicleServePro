import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function Billing({user}) {

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

  html2canvas(bill, {
    scale: 2,
    useCORS: true,
    windowWidth: bill.scrollWidth
  }).then((canvas) => {

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;  
    const pageHeight = 297;  

    const imgWidth = pageWidth - 20; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let positionY = 10;

  
    let heightLeft = imgHeight;

    pdf.addImage(imgData, "PNG", 10, positionY, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      positionY = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, positionY, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("VehicleServePro_Invoice.pdf");
  });
};

  const generateUpiQR = async () => {

    const amount = grandtotal.toFixed(2);

    const upiUrl =
      `upi://pay?pa=hetav.antani-1@oksbi&pn=VehicleServePro&am=${amount}&cu=INR&tn=Vehicle%20Service%20Bill`;

    const qr = await QRCode.toDataURL(upiUrl);
    setUpiQR(qr);
  };

  return (
    <div className="billing-wrapper">

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

          <div>
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div>
            <span>GST (%)</span>
            <input
              type="number"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              className="gst-input"
            />
          </div>

          <div>
            <span>GST Amount</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>

          <hr />

          <div className="total">
            <span>Total Payable</span>
            <span>₹{grandtotal.toFixed(2)}</span>
          </div>

        </div>

      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>

        <button onClick={downloadPDF}>
          Download Invoice PDF
        </button>

  {/* Only Customers see the Payment Module */}
  {user?.role === "CUSTOMER" ? (
    <>
      <button onClick={generateUpiQR} style={{ marginLeft: "10px" }}>
        Pay Now (Scan QR)
      </button>

      {upiQR && (
        <div style={{ marginTop: "15px" }}>
          <p>Scan using any UPI app</p>
          <img src={upiQR} width="220" alt="UPI QR" />
        </div>
      )}
    </>
  ) : (
    <div style={{ marginTop: "20px", color: "#666", fontStyle: "italic" }}>
      <p>⚠️ Payment options are only available to Customers.</p>
    </div>
  )}
</div>
    
    </div>
  )};