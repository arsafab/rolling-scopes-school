import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Output() editor = new EventEmitter();
  @Output() disabledStatus = new EventEmitter();

  categories: Object[];
  activeCategory: Object = {};
  targetCategory: Object = {};
  activeTask: Object;
  popoverMessage: string = 'Remove category?';
  isOpen: boolean;

  constructor(private _data: StoreService) {}

  ngOnInit() {
    this._data.store.subscribe(res => this.categories = res);
    this._data.activeCategory.subscribe(res => this.activeCategory = res);
    this._data.targetCategory.subscribe(res => this.targetCategory = res);
    this._data.activeTask.subscribe(res => this.activeTask = res);
    this._data.isOpen.subscribe(res => this.isOpen = res);
    this._data.updateCategory(this.activeCategory);
  }

  toggleSubitem(index: number): void {
    this.categories[index].toggleState = !this.categories[index].toggleState;
  }

  removeItem(index: number): void {
    this._data.updateUndo();
    this.categories.splice(index, 1);
    this.changeDisabledStatus();
  }

  changeDisabledStatus(): void {
    this.disabledStatus.emit();
  }

  edit(item: Object): void {
    item.editState = true;
    this.editor.emit(item);
  }

  create(item: Object): void {
    this.editor.emit(item);
  }

  sendItem(item: Object): void {
    this._data.updateCategory(item);
  }

  moveTask(item: Object): void {
    this._data.updateTargetCategory(item);

    this.activeCategory.tasks.forEach((task, i) => {
      if (task === this.activeTask) {
        const movedTask = this.activeCategory.tasks.splice(i, 1);
        this.targetCategory.tasks.unshift(movedTask[0]);
        this._data.updateCategory(this.targetCategory);
      }
    });

    this._data.updateOpenState(false);
  }
}
