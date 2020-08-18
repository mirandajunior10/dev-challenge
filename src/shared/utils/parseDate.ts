import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function parseDate(date: string): Date {
  const parsedDate = parse(date, 'dd/MM/yyyy', new Date(), {
    locale: ptBR,
  });
  return parsedDate;
}
