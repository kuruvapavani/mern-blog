import React from 'react';

const TimeAgo = ({ createdAt }) => {
  const formatTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime - postTime;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (daysDifference > 0) {
      return postTime.toLocaleDateString();
    } else if (hoursDifference > 0) {
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  return <span>{formatTimeAgo(createdAt)}</span>;
};

export default TimeAgo;
