import React from 'react';

interface Props {
  message: string;
}

const EmptyState = ({ message }: Props) => (
  <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
    <p>{message}</p>
  </div>
);

export default EmptyState;