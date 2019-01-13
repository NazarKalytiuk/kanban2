import { Todo } from '../../model/todo';

export interface StorageRepository {
  get(id: string): Todo;
  getAll(): Todo[];
  add(todo: Todo): Todo;
}
