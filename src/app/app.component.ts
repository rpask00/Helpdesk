import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user$: Observable<any>
  constructor(
    private userSv: UserService,
    private apiSv: ApiService,
    private router: Router,
  ) {
    this.user$ = this.userSv.user$.pipe(map(user => user.id ? user : null));
  }

  logout() {
    this.userSv.logout().then(() => this.router.navigate(['login']))
  }

  async ngOnInit() {

    // console.log(await this.apiSv.getModules());
    // console.log(this.apiSv.entryListToValueList(await this.apiSv.getEntry("Cases", "d2c0268b-c48f-eadd-270b-60c335745fd9")));
    // console.log(this.apiSv.entryListToValueList(await this.apiSv.getEntry("Cases", "9629be8c-238c-8430-4023-5e315040f314")));
    // console.log(await this.apiSv.getModuleEntries("Users"));
  }


}
