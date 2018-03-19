import {EntityState} from "../global/entity-state";
import {distinctUntilChanged, pluck} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Page} from "ht-models";
import {PageResults$} from "ht-data";

export class PageEntityState<S = any> implements EntityState<S> {
  stateSubject$: BehaviorSubject<object>;
  state$: Observable<object>;
  pageSubject$: Observable<Page<S>> ;
  stateTrasfrom;
  addState
  dataSubject$: ReplaySubject<S[]>;
  data$;

  setPageData$(pageData$) {
    this.pageSubject$ = pageData$;
    pageData$.pipe(PageResults$).subscribe(this.dataSubject$)
  }

  setState: (selector, value) => void;

  selector: (selector) => Observable<any> ;

  setData: (data: S[]) => void;
}