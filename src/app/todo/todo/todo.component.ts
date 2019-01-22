import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoEvent } from '../todo-event';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  @Output() changed = new EventEmitter<TodoEvent>();
  @Input() todo: Todo;

  constructor() { }

  ngOnInit() { }

  onChecked(event: Event & { target: { checked: boolean } }) {
    this.todo.checked = event.target.checked;
    this.changed.emit({event: 'Edited', todo: this.todo});
  }

  remove() {
    this.changed.emit({event: 'Removed', todo: this.todo});
  }
}

