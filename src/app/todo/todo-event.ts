import { Todo } from '../core/model/todo';

export interface TodoEvent {
  event: 'Added' | 'Edited' | 'Removed';
  todo: Todo;
}
