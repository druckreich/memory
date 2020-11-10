import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'memo-destroyable',
  templateUrl: './destroyable.component.html',
  styleUrls: ['./destroyable.component.css']
})
export class DestroyableComponent implements OnInit, OnDestroy {

  destroy$: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
