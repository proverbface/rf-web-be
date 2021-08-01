import moment from 'moment';

export const shortDateFormat = (date: Date) =>
  moment(date).format('DD-MM-YYYY');
