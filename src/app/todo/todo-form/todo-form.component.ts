import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Todo } from '@core/model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {

  title: string;

  @Output() todoAdded = new EventEmitter<Todo>();

  onSubmit() {
    const todo: Todo = {
      title: this.title,
      checked: false,
    };
    this.title = null;
    this.todoAdded.emit(todo);
  }

}
