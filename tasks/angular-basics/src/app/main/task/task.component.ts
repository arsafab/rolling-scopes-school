import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  activeTask: Object;
  title: string;
  description: string;
  isDone: boolean;
  url: string;
  parentUrl: string;

  constructor(private _data: StoreService, router: Router) {
    router.events.subscribe((res: any) => this.url = res);
  }

  ngOnInit() {
    this._data.activeTask.subscribe(res => this.activeTask = res);
    this.isDone = this.activeTask.isDone;
    this.title = this.activeTask.title;
    this.description = this.activeTask.description;
    this.parentUrl = this.url.url.replace(`/${this.title}`, '');
  }

  changeStatus(): void {
    this.isDone = !this.isDone;
  }

  save(): void {
    this.activeTask.isDone = this.isDone;
    this._data.updateOpenState(false);
  }

  cancel(): void {
    this.activeTask.title = this.title;
    this.activeTask.description = this.description;
    this._data.updateOpenState(false);
  }
}
