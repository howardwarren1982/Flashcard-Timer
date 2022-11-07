import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';

export const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div className="show-counter flex">
      <DateTimeDisplay value={minutes} type={''} isDanger={false} />
      :<DateTimeDisplay value={seconds} type={''} isDanger={false} />
    </div>
  );
};
