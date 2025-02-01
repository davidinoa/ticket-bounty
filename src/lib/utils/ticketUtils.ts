export const getStatusColor = (status: string) => {
  switch (status) {
    case 'DONE':
      return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400';
    case 'IN_PROGRESS':
      return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400';
    case 'OPEN':
      return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
    default:
      return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400';
  }
};

export const formatStatus = (status: string) => {
  switch (status) {
    case 'DONE':
      return 'Done';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'OPEN':
      return 'Open';
    default:
      return status;
  }
};
