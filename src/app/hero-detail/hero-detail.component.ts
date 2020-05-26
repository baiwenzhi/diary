import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Hero } from '../hero';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  @Input() hero: Hero;
  
  constructor(private CommonService: CommonService) { }

  ngOnInit() {
    if (this.CommonService.userinfo) {
      
    } else {
      this.CommonService.userReady.subscribe((ee) => {
        console.log(ee)
      })
    }
  }

}