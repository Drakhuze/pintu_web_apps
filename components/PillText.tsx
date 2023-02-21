import React from 'react';

interface Props {
  text: string;
  tag: string;
  setSelectedPill: any;
}

function PillText({ text, tag, setSelectedPill }: Props) {
  return (
    <div className="mr-2 border border-neutral-800 py-2 px-8 whitespace-nowrap rounded-full cursor-pointer transition ease-in-out duration-200 hover:bg-slate-900 active:bg-slate-800" onClick={() => { setSelectedPill(tag); }} aria-hidden="true">
      {text}
    </div>
  );
}

export default PillText;
