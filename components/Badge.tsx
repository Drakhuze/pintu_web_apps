import React, { memo } from 'react';

interface Props {
  text: string;
  tag: string;
  setSelectedBadge: any;
}

function Badge({ text, tag, setSelectedBadge }: Props) {
  return (
    <div className="mr-2 border border-neutral-800 py-2 px-8 whitespace-nowrap rounded-full cursor-pointer transition ease-in-out duration-200 hover:bg-slate-900 active:bg-slate-800" onClick={() => { setSelectedBadge(tag); }} aria-hidden="true">
      {text}
    </div>
  );
}

export default memo(Badge);
