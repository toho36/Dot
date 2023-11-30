export const getTimeDifference = (timestamp: string | undefined): string => {
  if (!timestamp) {
    return 'Timestamp not available';
  }

  const currentTimestamp = new Date().getTime();
  const lastImportTimestamp = new Date(timestamp).getTime();
  const difference = currentTimestamp - lastImportTimestamp;
  const minutes = Math.floor(difference / 60000);

  return `${minutes} minutes ago`;
};