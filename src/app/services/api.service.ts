import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://hdropczyce.e-bi.pl/service/v4_1/rest.php"

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Promise<any> {
    return this.http.post(this.url, {
      method: "login",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        user_auth: {
          user_name: username,
          password: CryptoJS.MD5(password).toString()
        }
      })
    },{
      headers:{
        "content-type":"text/html",
      }
    }).toPromise()
  }

}
