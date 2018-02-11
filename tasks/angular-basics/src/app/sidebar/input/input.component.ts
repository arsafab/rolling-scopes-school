import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../../store.service';

import Category from '../list/Category';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
  @Output() disabledStatus = new EventEmitter();

  categories: Category[];
  inputText: string;

  constructor(private _data: StoreService) { }

  ngOnInit() {
    this._data.store.subscribe(res => this.categories = res);
    this._data.updateStore(this.categories);
  }

  addCategory(): void {
    if (this.inputText) {
      this.categories.unshift(new Category(this.inputText));
      this.inputText = '';
      this._data.updateStore(this.categories);
      this.changeDisabledStatus();
    }
  }

  changeDisabledStatus(): void {
    this.disabledStatus.emit(true);
  }
}
