import React, { memo } from 'react';

interface Props {
  className: string;
}

const Skeleton = ({ className }: Props) => (
  <div className="animate-pulse">
    <div className={`${className} bg-gray-700 rounded-sm`} />
  </div>
);

export default memo(Skeleton);
