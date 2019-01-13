import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Output() changed = new EventEmitter<{event: string, todo: Todo}>();
  @Input() todo: Todo;

  constructor() { }

  ngOnInit() {
  }

  onChecked(event: Event & { target: { checked: boolean } }) {
    this.todo.checked = event.target.checked;
    this.changed.emit({event: 'checked', todo: this.todo});
  }

}
