import format from 'date-fns/format';

export const dateFormat = (date: Date | null) => {
  if (!date) return;

  const result = format(new Date(date), 'yyyy/MM/dd');
  return result;
};
