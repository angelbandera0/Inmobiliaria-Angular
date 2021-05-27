import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() page!: number;
  @Input() pageSize!: number;
  @Output() prev = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();
  isDisablePrev=false;
  isDisableNext=false;
  constructor() { }

  ngOnInit(): void {
  }
  onPrev(event:any){
    this.page-=1;
    this.prev.emit(this.page);
  }
  onNext(event:any){
    this.page+=1;
    this.prev.emit(this.page);
  }

}
