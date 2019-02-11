import { Todo } from '@core/model';

export interface TodoEvent {
  event: 'Added' | 'Edited' | 'Removed';
  todo: Todo;
}
