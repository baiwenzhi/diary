import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css']
})
export class FatherComponent implements OnInit {

  constructor() { }
  private getTool:any;
  getDate():void{
    this.getTool()
    .subscribe(heroes => {
      console.log(heroes)
      console.log('do save')
    });
  }
  getParamEvent($event) {
    this.getTool = $event;
  }
  ngOnInit(): void {
  }

}
