import { Component, OnInit, DoCheck } from '@angular/core';
import { StoreService } from '../../store.service';

import Task from '../../main/Task';
import Category from '../../sidebar/list/Category';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})

export class ProgressComponent implements OnInit, DoCheck {
  items: Object[] = [];
  categories: Object[] = [];
  tasks: Object[] = [];
  completed: number = 0;
  percent: number = 100;

  constructor(private _data: StoreService) { }

  ngOnInit() {
    this._data.store.subscribe(res => this.items = res);
  }

  ngDoCheck() {
    this.categories = [];
    this.extractCategories(this.items);
    this.extractTasks(this.tasks);
    this.countCompleted();
    this.countPercent();
  }

  extractCategories(arr: Object[]): void {
    arr.forEach((item) => {
        this.categories.push(item);
        if (item.subitems.length) {
          this.extractCategories(item.subitems);
        }
    });
  }

  extractTasks(arr: Object[]): void {
    arr = [];
    arr.forEach((item) => {
       item.tasks.forEach(task => this.tasks.push(task));
    });
    this._data.updateAllTasks(this.tasks);
  }

  countCompleted(): void {
    this.completed = this.tasks.filter(item => item.isDone).length;
  }

  countPercent(): void {
    if (this.tasks.length) {
      this.percent = (this.completed * 100) / this.tasks.length;
    }
  }
}
