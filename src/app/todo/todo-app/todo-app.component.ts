import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

  todos: Todo[] = [
    {
      title: 'title1',
      checked: true,
      id: 1
    },
    {
      title: 'title2',
      checked: false,
      id: 2
    }
  ];

  constructor(private todoS: TodoService) { }

  ngOnInit() {
    this.todoS.getAll().subscribe(todos => {
      this.todos = todos;
    });
  }

  onTodoAdded(todo: Todo) {
    console.log(todo);
    this.todos.push(todo);
    this.todoS.add(todo).subscribe(t => {
      console.log(t);
    });
  }

  onTodosChanged(event: {event: string, todo: Todo}) {
    if (event.event === 'checked') {
      const index = this.todos.findIndex(e => e.id === event.todo.id);
      this.todos[index] = event.todo;
      this.todoS.edit(this.todos[index]);
    }
  }

}
