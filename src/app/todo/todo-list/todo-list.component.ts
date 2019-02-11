import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { List } from 'immutable';

import { Todo } from '@core/model';
import { TodoEvent } from '../';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  @Input() todos: List<Todo>;
  @Output() changed = new EventEmitter<TodoEvent>();

  onTodoChanged(event: TodoEvent) {
    this.changed.emit(event);
  }
}
