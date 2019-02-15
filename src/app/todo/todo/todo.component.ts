import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { TodoEvent } from '../';
import { Todo } from '@core/model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {

  @Output() changed = new EventEmitter<TodoEvent>();
  @Input() todo: Todo;

  onChecked(event: boolean) {
    this.todo.checked = event;
    this.changed.emit({event: 'Edited', todo: this.todo});
  }

  remove() {
    this.changed.emit({event: 'Removed', todo: this.todo});
  }
}

