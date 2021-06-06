import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { LoggingService } from './services/logging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  session$: Observable<any>
  constructor(
    private loggingSv: LoggingService,
    private router: Router
  ) {
    this.session$ = this.loggingSv.session$;
  }

  logout() {
    this.loggingSv.logout().then(() => this.router.navigate(['login']))
  }

  async ngOnInit() {
    // console.log(await this.apiSv.getModules());
    // console.log(await this.apiSv.getModuleEntries("Users"));
  }

}
