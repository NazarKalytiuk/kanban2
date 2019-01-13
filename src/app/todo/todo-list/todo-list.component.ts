import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  @Output() changed = new EventEmitter<{event: string, todo: Todo}>();

  constructor() { }

  ngOnInit() {
  }

  onTodoChanged(event: {event: string, todo: Todo}) {
    console.log(event);
    this.changed.emit(event);
  }
}
