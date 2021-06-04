import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as $ from "jquery";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://hdropczyce.e-bi.pl/service/v4_1/rest.php"

  constructor(
    private http: HttpClient,
    private userSv: UserService
  ) { }

  async getCasesList(): Promise<any> {
    return await $.post(this.url, {
      method: "get_entry_list",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        session: await this.userSv.user,
        module_name: "Cases",
      })

    })
  }
}
