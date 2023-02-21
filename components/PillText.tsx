import React from "react";

interface Props {
  text: string;
}

const PillText = ({text}: Props) => {
  return (
    <div className="mx-1 border border-neutral-800 py-2 px-8 rounded-full cursor-pointer transition hover:bg-neutral-900">
      {text}
    </div>
  );
}

export default PillText;