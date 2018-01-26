import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../../../store.service';

@Component({
  selector: 'app-subitems',
  templateUrl: './subitems.component.html',
  styleUrls: ['./subitems.component.scss']
})

export class SubitemsComponent implements OnInit {
  @Input('subitem') subitem: any;
  @Output() edited = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() disabledStatus = new EventEmitter();

  activeCategory: any = [];
  targetCategory: any = [];
  activeTask: any;
  isOpen: boolean;

  constructor(private _data: StoreService) {}

  ngOnInit() {
    this._data.activeCategory.subscribe(res => this.activeCategory = res);
    this._data.targetCategory.subscribe(res => this.targetCategory = res);
    this._data.activeTask.subscribe(res => this.activeTask = res);
    this._data.isOpen.subscribe(res => this.isOpen = res);
    this._data.updateCategory(this.activeCategory);
  }

  toggleSubitem(index: number): void {
    this.subitem.subitems[index].toggleState = !this.subitem.subitems[index].toggleState;
  }

  removeItem(index: number): void {
    this._data.updateUndo();
    this.subitem.subitems.splice(index, 1);

    if (!this.subitem.subitems.length) {
      this.subitem.toggleState = !this.subitem.toggleState;
    }

    this.disabledStatus.emit();
  }

  edit(subitem) {
    subitem.editState = true;
    this.edited.emit(subitem);
  }

  create(subitem) {
    this.created.emit(subitem);
  }

  sendItem(item) {
    this._data.updateCategory(item);
  }

  moveTask(item) {
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

  changeDisabledStatus() {
    this.disabledStatus.emit();
  }
}
