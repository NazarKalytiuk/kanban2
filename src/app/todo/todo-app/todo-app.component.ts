import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoService } from 'src/app/core/services/todo.service';
import { TodoEvent } from '../todo-event';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {
  constructor(public todoS: TodoService) { }

  ngOnInit() {
   }

  onTodoAdded(todo: Todo) {
    this.todoS.add(todo).subscribe(null);
  }

  onTodoChanged(event: TodoEvent) {
    if (event.event === 'Edited') {
      this.todoS.edit(event.todo).subscribe(null);
    }
  }

}
