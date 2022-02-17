import { format as dateFormat } from 'date-fns';
import { fr as frLocale } from 'date-fns/locale';

export const formatDate = (date: Date, format: string) =>
  dateFormat(date, format, {
    locale: frLocale,
  });
