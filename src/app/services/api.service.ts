import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as $ from "jquery";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  url = "https://hdropczyce.e-bi.pl/service/v4_1/rest.php"

  constructor(
    private http: HttpClient,
    private userSv: UserService
  ) { }

  async getModuleEntries(module_name: string, offset: number = 1): Promise<any> {
    return await $.post(this.url, {
      method: "get_entry_list",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        session: this.userSv.session,
        module_name,
        offset
      })

    })
  }

  async getModules(): Promise<any> {
    return await $.post(this.url, {
      method: "get_available_modules",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({ session: this.userSv.session, })

    })
  }

  async getEntry(module_name: string, id: string, select_fields?: string[]): Promise<any> {
    return await $.post(this.url, {
      method: "get_entry",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        session: this.userSv.session,
        module_name,
        id,
        select_fields
      })

    })
  }

  async setEntry(module_name: string, name_value_list: any[], id?: string): Promise<any> {
    let payload: any = {
      session: this.userSv.session,
      module_name,
      name_value_list
    }

    if (id)
      payload.id = id

    return await $.post(this.url, {
      method: "set_entry",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify(payload)
    })
  }




}
