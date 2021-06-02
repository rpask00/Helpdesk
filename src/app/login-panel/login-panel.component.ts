import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  form: FormGroup;
  constructor(
    private apiSv: ApiService
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
  }

  async login(e: Event) {
    e.preventDefault();
    console.log(await this.apiSv.login(this.form.value.username, this.form.value.passwrod));
  }

}
