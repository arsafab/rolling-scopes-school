import { Component, OnInit, DoCheck } from '@angular/core';
import { StoreService } from '../../store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, DoCheck {
  tasks: object[];
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  selectedTaskUrl: string;
  isDone: boolean = false;
  doneTasks: object[] = [];

  constructor(private _data: StoreService) {
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.getStatesAsObservable(token));
  }

  ngOnInit() {
    this._data.allTasks.subscribe(res => this.tasks = res);
  }

  ngDoCheck() {
    this.doneTasks = this.tasks.filter(item => item.isDone);
  }

  getStatesAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'ig');

    if (this.isDone) {
      return Observable.of(
        this.doneTasks.filter((state: any) => {
          return query.test(state.title);
        })
      );
    } else {
      return Observable.of(
        this.tasks.filter((state: any) => {
          return query.test(state.title);
        })
      );
    }
  }

  changeTypeaheadLoading(loading: boolean): void {
    this.typeaheadLoading = loading;
  }

  changeTypeaheadNoResults(hasMatches: boolean): void {
    this.typeaheadNoResults = hasMatches;
  }

  typeaheadOnSelect(matchWord: TypeaheadMatch): void {
    this._data.updateTask(matchWord.item);
    this.selectedTaskUrl = `/category/${matchWord.item.categoryTitle}/${matchWord.item.title}`;
  }

  setTaskDoneOption(): void {
    this.isDone = !this.isDone;
  }
}
