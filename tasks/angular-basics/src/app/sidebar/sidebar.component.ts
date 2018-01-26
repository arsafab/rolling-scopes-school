import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { StoreService } from '../store.service';
import Category from './list/Category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  modalRef: BsModalRef;
  inputText: string;
  category: any;
  categories: any;
  disabledStatus: boolean = true;
  redoStatus: boolean = true;

  constructor(private modalService: BsModalService, private _data: StoreService) {}

  ngOnInit() {}

  openEditor(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.category = item;
  }

  editTitle() {
    this.disabledStatus = true;
    this.redoStatus = true;

    if (this.inputText) {
      if (this.category.editState) {
        this.category.title = this.inputText;
        this.category.editState = false;
        this.inputText = '';
        this.modalRef.hide();
      } else {
        this.category.subitems.unshift(new Category(this.inputText));
        this.category.toggleState = true;
        this.inputText = '';
        this.modalRef.hide();
      }
    }
  }

  redo() {
    this._data.redo();
    this.disabledStatus = false;
    this.redoStatus = true;
  }

  undo() {
    this._data.undo();
    this.disabledStatus = true;
    this.redoStatus = false;
  }

  changeDisabledStatus(e) {
    if (e) {
      this.disabledStatus = e;
      this.redoStatus = e;
    } else {
      this.disabledStatus = !this.disabledStatus;
      this.redoStatus = !this.disabledStatus;
    }
  }
}
