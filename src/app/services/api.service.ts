import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as $ from "jquery";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://hdropczyce.e-bi.pl/service/v4_1/rest.php"

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return $.post("http://hdropczyce.e-bi.pl/service/v4_1/rest.php", {
      method: "login",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        user_auth: {
          user_name: "rpasko",
          password: "a1e9d10f3f39612885ace58a44b98a09"
        }
      })
    })

    // return this.http.post(this.url, {
    //   method: "login",
    //   input_type: "JSON",
    //   response_type: "JSON",
    //   rest_data: { "user_auth": { "user_name": "rpasko", "password": "a1e9d10f3f39612885ace58a44b98a09" } }
    // }, {
    //   headers: {
    //     // "Content-Type": "application/json"
    //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    //   },

    // })

  }

}
