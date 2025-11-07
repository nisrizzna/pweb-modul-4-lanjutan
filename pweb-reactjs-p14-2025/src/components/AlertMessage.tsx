import React from 'react';
import './AlertMessage.css';

interface Props {
  message: string;
  type: 'error' | 'success';
}

const AlertMessage = ({ message, type }: Props) => (
  <div className={`alert ${type === 'error' ? 'alert-error' : 'alert-success'}`}>
    {message}
  </div>
);

export default AlertMessage;