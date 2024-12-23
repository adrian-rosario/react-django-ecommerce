import React from "react";
import { Alert } from "react-bootstrap";
function AlertMessage({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default AlertMessage;
