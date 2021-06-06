import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';


@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  form: FormGroup;
  errorMessage = '';
  constructor(
    private loggingSv: LoggingService,
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

  ngOnInit() { }

  async login(e: Event) {
    e.preventDefault();
    await this.loggingSv.login(this.form.value.username, this.form.value.password)

    this.loggingSv.session$.pipe(take(1)).subscribe(session => {
      if (session)
        this.router.navigate(["cases", "list"])
      else
        this.errorMessage = "Nie prawidłowa nazwa lub hasło."
    })


  }

}
