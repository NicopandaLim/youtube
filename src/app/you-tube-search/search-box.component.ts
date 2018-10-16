import { Component, OnInit, Output, 
        EventEmitter, ElementRef } from '@angular/core';
import { YouTubeSearchService } from './you-tube-search.service';
import { SearchResult } from './search-result.model';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-search-box',
    template: `
      <input type="text" class="form-control" placeholder="Search" autofocus>
    `
  })

  export class SearchBoxComponent implements OnInit {
      @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
      @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

      constructor(private youtube: YouTubeSearchService, private el: ElementRef) {  // two injections

      }


      ngOnInit(): void {
          // convert keyup event into an observable stream
          Observable.fromEvent(this.el.nativeElement, 'keyup')
          //fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value) // extract the value of the input
            .filter((text: string) => text.length > 1) // filter out if empty
            .debounceTime(250)                         // only once every 250ms
            .do(() => this.loading.emit(true))         // enable loading
            .map((query: string) => this.youtube.search(query))// search
            .switch()                                           // discarding old events if new input comes in
          // act on the return of the search
          .subscribe(
            (results: SearchResult[]) => { // when sucesss
              this.loading.emit(false);
              this.results.emit(results);
            },
            (err: any) => {               // when error
              console.log(err);
              this.loading.emit(false);
            },
            () => {                      // when completion
              this.loading.emit(false);
            }
          );

    }

  }

  