import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoEvent } from '../todo-event';
import { List } from 'immutable';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  @Input() todos: List<Todo>;

  @Output() changed = new EventEmitter<TodoEvent>();

  constructor() { }

  ngOnInit() { }

  onTodoChanged(event: TodoEvent) {
    this.changed.emit(event);
  }
}
