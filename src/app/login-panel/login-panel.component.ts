import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from './../services/user.service';


@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  form: FormGroup;
  errorMessage = '';
  constructor(
    private userSv: UserService,
    private router: Router
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
    this.userSv.user$.subscribe(console.log)

  }

  async login(e: Event) {
    e.preventDefault();
    await this.userSv.login(this.form.value.username, this.form.value.password)

    this.userSv.user$.pipe(take(1)).subscribe(user => {
      if (user)
        this.router.navigate(["cases", "list"])
      else
        this.errorMessage = "Nie prawidłowa nazwa lub hasło."
    })


  }

}
