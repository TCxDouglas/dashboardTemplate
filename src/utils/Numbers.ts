import dayjs, { Dayjs } from 'dayjs';
import { TypePeriod } from '@/constants/constants';

const FORMAT_DATE = 'YYYY-MM-DD';

export const formatNumberWithMoney = (x: number) => {
  const number = x.toFixed(2);
  const str = number.toString().split('.');
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return str.join('.');
};

export const calculatePeriod = (fechaInicio: Dayjs, tipoPeriodo: TypePeriod) => {
  const from = dayjs(fechaInicio);
  let to = dayjs(fechaInicio);

  switch (tipoPeriodo) {
    case 'biannual':
      to = from.add(6, 'month');
      break;
    case 'annual':
      to = from.add(1, 'year');
      break;
    case 'quarterly':
      to = from.add(3, 'month');
      break;
    case 'monthly':
      to = from.add(1, 'month');
      break;
    default:
      throw new Error('Tipo de período no válido');
  }

  return { from: from.format(FORMAT_DATE), to: to.format(FORMAT_DATE) };
};

export const getPeriodMonth = (monthNumber: number, nextRange?: boolean) => {
  const monthCurrent = dayjs().month();
  if (nextRange && monthNumber < monthCurrent + 1) monthNumber += 12;

  const date = dayjs().month(monthNumber - 1);

  const startMonth = date.startOf('month');
  const endMonth = date.endOf('month');

  return { startMonth, endMonth };
};
