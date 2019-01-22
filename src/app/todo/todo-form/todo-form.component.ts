import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {

  title: string;

  @Output() todoAdded = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    const todo: Todo = {
      title: this.title,
      checked: false,
    };
    this.title = null;
    this.todoAdded.emit(todo);
  }

}
