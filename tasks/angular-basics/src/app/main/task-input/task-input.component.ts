import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';

import Task from '../Task';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {

  inputText: string;
  activeCategory: Object;

  constructor(private _data: StoreService) { }

  ngOnInit(): void {
    this._data.activeCategory.subscribe(res => this.activeCategory = res);
  }

  addTask(): void {
    if (this.inputText) {
      this.activeCategory.tasks.unshift(new Task(this.inputText, this.activeCategory.title));
      this.inputText = '';
    }
  }
}
