import { formatDistanceToNow } from 'date-fns';

export const getFormatDistanceToNow = (date: number) => {
  console.log(date);

  const fromNow = formatDistanceToNow(date);

  return `${fromNow} ago`;
};
