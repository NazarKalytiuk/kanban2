import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  title: string;
  @Output() todoAdded = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    const todo: Todo = {
      title: this.title,
      checked: false,
      id: new Date().valueOf()
    };
    this.title = null;
    this.todoAdded.emit(todo);
  }

}
