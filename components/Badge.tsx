import React, { memo } from 'react';

interface Props {
  text: string;
  tag: string;
  setSelectedBadge: any;
}

function Badge({ text, tag, setSelectedBadge }: Props) {
  return (
    <button
      type="button"
      className="mr-2 mb-2 text-sm font-thin border border-neutral-800 py-2 px-4 whitespace-nowrap rounded-xl cursor-pointer transition ease-in-out duration-200 hover:bg-slate-900 active:bg-slate-800 focus:bg-slate-700"
      onClick={() => { setSelectedBadge(tag); }}
      aria-hidden="true"
    >
      {text}
    </button>
  );
}

export default memo(Badge);
