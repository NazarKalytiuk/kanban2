import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from '@todo';
import { SharedModule } from '@shared';
import { Todo } from '@core/model';
import { TodoEvent } from '@todo/todo-event';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TodoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = {checked: false, title: 'title'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit remove todo', () => {
    // Arrange
    const spy = spyOn(component.changed, 'emit');
    const todo: Todo = {
      checked: false,
      title: 'title'
    };
    const todoEvent: TodoEvent = {event: 'Removed', todo: todo};
    // Act
    component.remove();
    // Assert
    expect(todoEvent.event).toBe('Removed');
    expect(spy).toHaveBeenCalledWith(todoEvent);
  });

  it('should emit check todo', () => {
    // Arrange
    const spy = spyOn(component.changed, 'emit');
    const todoEvent: TodoEvent = {event: 'Edited', todo: component.todo};
    // Act
    component.onChecked(false);
    // Assert
    expect(todoEvent.event).toBe('Edited');
    expect(spy).toHaveBeenCalledWith(todoEvent);
  });
});
