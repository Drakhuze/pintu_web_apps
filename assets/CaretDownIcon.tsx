import React from 'react';

interface Props {
  className: string;
}

function CaretDownIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path d="M11 10l4 5 4-5z" />
    </svg>
  );
}

export default CaretDownIcon;
