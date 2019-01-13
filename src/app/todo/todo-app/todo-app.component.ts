import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

  todos: Todo[] = [
    {
      title: 'title1',
      checked: true
    },
    {
      title: 'title2',
      checked: false
    }
  ];

  onTodoAdded(todo: Todo) {
    console.log(todo);
    this.todos.push(todo);
  }

  constructor() { }

  ngOnInit() {
  }

}
