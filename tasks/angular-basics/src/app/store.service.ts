import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {

  private items = new BehaviorSubject<object[]>([]);
  private item = new BehaviorSubject<object>({});
  private task = new BehaviorSubject<object>({});
  private tasks = new BehaviorSubject<object[]>([]);
  private state = new BehaviorSubject<boolean>(false);
  private target = new BehaviorSubject<object>({});

  store = this.items.asObservable(); // categories with subitems and tasks
  activeCategory = this.item.asObservable(); // category that is opened at the moment
  activeTask = this.task.asObservable(); // task that is opened at the moment
  allTasks = this.tasks.asObservable(); // all tasks from all categories for progressbar and search
  isOpen = this.state.asObservable(); // property for the category buttons/ If true - remove, edit and add btn is hided
  targetCategory = this.target.asObservable(); // temp for category in where a task will be moved

  undoState: string;
  redoState: string;

  constructor() { }

  updateStore(arr: object[]): void {
    this.items.next(arr);
  }

  updateCategory(obj: object): void {
    this.item.next(obj);
  }

  updateTask(obj: object): void {
    this.task.next(obj);
  }

  updateAllTasks(arr: object[]): void {
    this.tasks.next(arr);
  }

  updateOpenState(bool: boolean): void {
    this.state.next(bool);
  }

  updateTargetCategory(obj: object): void {
    this.target.next(obj);
  }

  redo(): void {
    if (this.redoState) {
      this.updateUndo();
      this.items.next(JSON.parse(this.redoState));
    }
  }

  updateRedo(): void {
    this.redoState = JSON.stringify(this.items.getValue());
  }

  undo(): void {
    if (this.undoState) {
      this.updateRedo();
      this.items.next(JSON.parse(this.undoState));
    }
  }

  updateUndo(): void {
    this.undoState = JSON.stringify(this.items.getValue());
  }
}
