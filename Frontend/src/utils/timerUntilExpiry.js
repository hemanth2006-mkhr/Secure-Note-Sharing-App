export default function timerUntilExpiry(
  expiryTime,
  now = new Date()
) {
  // No expiry set
  if (!expiryTime) {
    return "one-time";
  }

  const diff =
    new Date(expiryTime).getTime() -
    new Date(now).getTime();

  // Already expired
  if (diff <= 0) {
    return "Expired";
  }

  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return `Expires in ${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `Expires in ${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Expires in ${hours}h`;
  }

  const days = Math.floor(hours / 24);

  return `Expires in ${days}d`;
}