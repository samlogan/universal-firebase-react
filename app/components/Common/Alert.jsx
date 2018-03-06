import React from 'react';
import './Alert.scss';

export const Alert = (props) => {
  const { alerts } = props;
  const alert = Object.keys(alerts).find(key => alerts[key]);
  if (!alert) return <div className="message" />;
  return (
    <div className={`message active ${alert}`}>
      {alerts[alert]}
    </div>
  );
};
