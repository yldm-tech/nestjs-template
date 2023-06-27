import { format, formatDistanceToNow } from 'date-fns';

export function fDate(date: string): string {
  return format(new Date(date), 'yyyy/MM/dd');
}

export function fDateTime(date: string): string {
  return format(new Date(date), 'yyyy/MM/dd HH:mm');
}

export function fDateTimeSuffix(date: string): string {
  return format(new Date(date), 'yyyy/MM/dd hh:mm p');
}

export function fToNow(date: string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
