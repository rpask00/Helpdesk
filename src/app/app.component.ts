import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<any>
  constructor(
    private userSv: UserService
  ) {
    this.user$ = this.userSv.user$;
  }

  logout() {
    this.userSv.logout()
  }


}
