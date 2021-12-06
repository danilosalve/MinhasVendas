import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent implements OnInit {
  @Input() placeHolder = '';
  @Input() help = '';
  @Input() debounceInput = 300;
  @Input() minValue = 0;
  @Output() changeSearch = new EventEmitter();

  searchOrder: FormGroup = this.formBuilder.group({
    search: ['']
  });

  constructor(
    protected formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchOrder.valueChanges.pipe(
      debounceTime(this.debounceInput),
      filter(
        value => value.search.length >= this.minValue || !value.search.length
      ),
      distinctUntilChanged(),
      switchMap(value => this.filterEmitter(value.search)),
    )
    .subscribe();
  }

  filterEmitter($event: string): Observable<any> {
    this.changeSearch.emit($event);
    return of()
  }
}
