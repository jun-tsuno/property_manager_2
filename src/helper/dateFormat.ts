import format from 'date-fns/format';

export const dateFormat = (date: string) => {
  const result = format(new Date(date), 'yyyy/MM/dd');
  return result;
};
