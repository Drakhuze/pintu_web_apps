import React from 'react';

interface Props {
  className: string;
}

function ChevronUp({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}
export default ChevronUp;
