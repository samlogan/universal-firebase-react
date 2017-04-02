import React from 'react';

export const ValidationError = props => {
  const { submitFailed, errors, field } = props;
  if (!submitFailed || !errors || !errors[field]) return <span className="validation_error" />;
  return <span className="validation_error active">{errors[field]}</span>;
};
