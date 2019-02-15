import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent, TodoListComponent, TodoEvent } from '@todo';
import { SharedModule } from '@shared';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TodoListComponent, TodoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send output on todo change', () => {
    // Arrange
    const spy = spyOn(component.changed, 'emit');
    const todo: TodoEvent = {event: 'Added', todo: {title: 'title', checked: false}};
    // Act
    component.onTodoChanged(todo);
    // Assert
    expect(spy).toHaveBeenCalledWith(todo);
  });
});
