import format from 'date-fns/format';

export const dateFormat = (date: Date | null) => {
  if (!date) return null;

  const result = format(new Date(date), 'yyyy/MM/dd');
  return result;
};
