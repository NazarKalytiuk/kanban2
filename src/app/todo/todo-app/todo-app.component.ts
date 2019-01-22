import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/core/model/todo';
import { TodoService } from 'src/app/core/services/todo.service';
import { TodoEvent } from '../todo-event';
import { List } from 'immutable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoAppComponent implements OnInit, OnDestroy {

  todos: List<Todo> = List();
  destroyed$: Subject<boolean> = new Subject();
  constructor(public todoS: TodoService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.todoS.getAll().pipe(takeUntil(this.destroyed$)).subscribe(t => {
      this.todos = List(t);
      this.cd.detectChanges();
    });
  }

  onTodoAdded(todo: Todo) {
    this.todoS.add(todo).pipe(takeUntil(this.destroyed$)).subscribe(null);
  }

  onTodoChanged(event: TodoEvent) {
    if (event.event === 'Edited') {
      this.todoS.edit(event.todo).pipe(takeUntil(this.destroyed$)).subscribe(null);
    } if (event.event === 'Removed') {
      this.todoS.remove(event.todo).pipe(takeUntil(this.destroyed$)).subscribe(null);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
