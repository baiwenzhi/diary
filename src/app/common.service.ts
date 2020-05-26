import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public userinfo:Object;
  public userReady = new EventEmitter<any>();
  

  initUser() {
    this.http.get('assets/config.json').subscribe((uu) => {
        this.userinfo = uu;
        this.userReady.emit(uu);
    })
  }

  getConfig() {
    if (this.userinfo) {
        return of(this.userinfo);
    } else {
        return this.http.get('assets/config.json')
    }
  }
  get(params) {
      if (typeof params === 'string') {
          return this.http.get(params)
      } else {
          return this.getConfig().pipe(
            concatMap((userinfo) => {
                this.userinfo = userinfo;
                return this.http.get(params(userinfo))
            })
          )
      }
  }
}