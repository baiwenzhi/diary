import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { CommonService } from '../common.service';

import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  @Output() getParam = new EventEmitter();
  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService, private CommonService: CommonService) { }
  ngOnInit() {
    this.getHeroes();
    this.getParam.emit(this._getParam);
    this.CommonService.initUser();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  _getParam = () => {
    console.log('tool1 开始删除文件')
    return this.heroService.getHeroes().pipe(mergeMap((heros) => {
      console.log('删除成功后处理tool的参数并返回')
      return of({
        heros,
        current:this.selectedHero
      })
    }))
  }
}