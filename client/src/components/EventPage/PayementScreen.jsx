import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { useAuth } from "../../context/auth";

const PaymentScreen = () => {
  const { title, price } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const contentRef = useRef(null);

  const [paymentReceived, setPaymentReceived] = useState(false);

  const paymentDetails = {
    recipient: "Meet&Greet",
    amount: price, // Convert price to a number
    currency: "USD",
    description: `${title.replace(/-/g, " ")}`, // Include event title in description
    transaction_id: "#" + Math.floor(Math.random() * 100000000000),
  };

  const qrCodeValue = JSON.stringify(paymentDetails);

  // Function to handle payment confirmation
  const handlePaymentConfirmation = () => {
    setPaymentReceived(true);
  };

  // Function to redirect after countdown

  // Function to handle manual redirection
  const handleRedirect = () => {
    if (auth.user && !auth.user.admin) navigate(`/user/events/${title}`);
    else navigate(`/events/${title}`);
  };
  const handleDownload = () => {
    // Hide the buttons
    const downloadButton = document.getElementById("downloadButton");
    const redirectButton = document.getElementById("redirectButton");
    if (downloadButton && redirectButton) {
      downloadButton.style.display = "none";
      redirectButton.style.display = "none";
    }

    // Capture the content
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "payment_bill.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Show the buttons again
      if (downloadButton && redirectButton) {
        downloadButton.style.display = "block";
        redirectButton.style.display = "block";
      }
    });
  };

  return (
    <div
      ref={contentRef}
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1000')",

        backdropFilter: "blur(10rem)",
      }}
    >
      <div className=" bg-white shadow-md rounded-lg p-8 max-w-md mx-auto font-display mt-24 ">
        <div className="flex justify-between items-center mb-6">
          <div className="font-extrabold text-4xl cursor-pointer flex items-center text-red-700 font-dance ">
            Meet&Greet
          </div>

          <h1 className="text-2xl font-bold">Invoice</h1>
        </div>
        {paymentReceived && (
          <div className="mb-6">
            <p className="font-mono">
              <span className="font-semibold font-display">Payment Date:</span>
              {"  "}
              {new Date().toLocaleDateString()}
            </p>
            <p className="font-mono">
              <span className="font-semibold font-display">
                Transaction ID:{" "}
              </span>
              {"    "}
              {paymentDetails.transaction_id}
            </p>
          </div>
        )}

        {paymentReceived ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold pb-7 text-center">
                Payment Details
              </h2>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Recipient:</span>
                <span>{paymentDetails.recipient}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Amount:</span>
                <span>${paymentDetails.amount}</span>
              </div>
              <div className="flex justify-center mb-2 mt-4 text-red-800 font-bebas text-xl ">
                <span>{paymentDetails.description}</span>
              </div>
            </div>
            <p className="text-green-600 text-center text-3xl font-dance">
              Payment Received!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-center">
              <QRCode value={qrCodeValue} size={200} />
            </div>
            <p className="text-center mb-6 font-medium">
              Scan the QR code to initiate payment
            </p>
            <button
              onClick={handlePaymentConfirmation}
              className="block w-full bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded hover:duration-1000"
            >
              Confirm Payment
            </button>
          </div>
        )}
      </div>
      {paymentReceived && (
        <div>
          {" "}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownload}
              id="downloadButton"
              className="bg-slate-50 hover:bg-slate-300 text-black py-2 px-4 rounded hover:duration-1000"
            >
              Download Bill
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              id="redirectButton"
              onClick={handleRedirect}
              className="bg-slate-50 hover:bg-slate-300 text-black py-2 px-4 rounded hover:duration-1000"
            >
              Go to Event Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
