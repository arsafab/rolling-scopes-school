import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  activeCategory: Object;
  activeTask: Object;
  url: Object;

  constructor(private _data: StoreService, router: Router) {
    router.events.subscribe((res: any) => this.url = res);
  }

  ngOnInit(): void {
    this._data.activeCategory.subscribe(res => this.activeCategory = res);
    this._data.activeTask.subscribe(res => this.activeTask = res);
  }

  sendTask(item: Object): void {
    this._data.updateTask(item);
    this._data.updateOpenState(true);
  }

  changeStatus(item: Object): void {
    item.isDone = !item.isDone;
    this._data.updateTask(item);
  }
}
