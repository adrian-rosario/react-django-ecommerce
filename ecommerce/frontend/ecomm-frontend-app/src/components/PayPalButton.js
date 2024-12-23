import React, { useEffect, useRef } from "react";

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // Amount to charge
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details); // Callback function for success
          });
        },
        onError: (err) => {
          console.error("PayPal Button Error:", err);
        },
      })
      .render(paypalRef.current); // Render PayPal buttons into the container
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
