import React, { useState, useEffect } from "react";

const onlineThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds

const formatTimeDifference = (lastActivityTime: Date) => {
  const now = new Date();
  const lastActivity = new Date(lastActivityTime);
  const timeDifference = now.getTime() - lastActivity.getTime();

  if (timeDifference < onlineThreshold) {
    return `Active`;
  } else if (timeDifference < 60 * 60 * 1000) {
    // less than 1 hour
    const minutes = Math.floor(timeDifference / (60 * 1000));
    return `Last activity ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // less than 1 day
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    return `Last activity ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    // less than 1 week
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    return `Last activity ${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    // less than 1 month
    const weeks = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    return `Last activity ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) {
    // less than 1 year
    const months = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
    return `Last activity ${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
    return `Last activity ${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

interface LastActivityProps {
  lastActivityTime: string;
}

const LastActivity: React.FC<LastActivityProps> = ({ lastActivityTime }) => {
  const [activityStatus, setActivityStatus] = useState("");

  useEffect(() => {
    const updateStatus = () => {
      setActivityStatus(formatTimeDifference(new Date(lastActivityTime)));
    };

    updateStatus();

    const interval = setInterval(() => {
      updateStatus();
    }, 60 * 1000); // Update every minute

    return () => clearInterval(interval);
  }, [lastActivityTime]);

  return <span>{activityStatus}</span>;
};

export default LastActivity;
