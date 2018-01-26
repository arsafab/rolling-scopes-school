import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {

  private items = new BehaviorSubject<any>([]);
  private item = new BehaviorSubject<any>({});
  private task = new BehaviorSubject<any>({});
  private tasks = new BehaviorSubject<any>([]);
  private state = new BehaviorSubject<any>(false);
  private target = new BehaviorSubject<any>({});

  store = this.items.asObservable(); // categories with subitems and tasks
  activeCategory = this.item.asObservable(); // category that is opened at the moment
  activeTask = this.task.asObservable(); // task that is opened at the moment
  allTasks = this.tasks.asObservable(); // all tasks from all categories for progressbar and search
  isOpen = this.state.asObservable(); // property for the category buttons/ If true - remove, edit and add btn is hided
  targetCategory = this.target.asObservable(); // temp for category in where a task will be moved

  undoState;
  redoState;

  constructor() { }

  updateStore(arr) {
    this.items.next(arr);
  }

  updateCategory(obj) {
    this.item.next(obj);
  }

  updateTask(obj) {
    this.task.next(obj);
  }

  updateAllTasks(arr) {
    this.tasks.next(arr);
  }

  updateOpenState(bool) {
    this.state.next(bool);
  }

  updateTargetCategory(obj) {
    this.target.next(obj);
  }

  redo() {
    if (this.redoState) {
      this.updateUndo();
      this.items.next(JSON.parse(this.redoState));
    }
  }

  updateRedo() {
    this.redoState = JSON.stringify(this.items.getValue());
  }

  undo() {
    if (this.undoState) {
      this.updateRedo();
      this.items.next(JSON.parse(this.undoState));
    }
  }

  updateUndo() {
    this.undoState = JSON.stringify(this.items.getValue());
  }
}
