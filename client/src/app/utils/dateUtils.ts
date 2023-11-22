export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const sortByDate = (a: string, b: string): number => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateB.getTime() - dateA.getTime();
};
