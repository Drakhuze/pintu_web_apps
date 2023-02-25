import React from 'react';

interface Props {
  className: string;
}

function CaretUpIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path d="M2 18l8-10 8 10z" />
    </svg>
  );
}

export default CaretUpIcon;
