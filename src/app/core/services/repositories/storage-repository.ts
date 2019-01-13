import { Todo } from '../../model/todo';

export interface StorageRepository {
  get(id: number): Todo;
  getAll(): Todo[];
  add(todo: Todo): Todo;
  remove(todo: Todo): void;
  edit(todo: Todo): Todo;
}
