import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as $ from "jquery";
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  url = "https://hdropczyce.e-bi.pl/service/v4_1/rest.php"

  constructor(
    private http: HttpClient,
    private loggingSv: LoggingService
  ) { }

  async getModuleEntries(module_name: string, offset: number = 1): Promise<any> {
    return await $.post(this.url, {
      method: "get_entry_list",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        session: await this.loggingSv.session,
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
      rest_data: JSON.stringify({ session: await this.loggingSv.session })

    })
  }

  async getEntry(module_name: string, id: string, select_fields?: string[]): Promise<any> {
    return await $.post(this.url, {
      method: "get_entry",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        session: await this.loggingSv.session,
        module_name,
        id,
        select_fields
      })

    })
  }

  async setEntry(module_name: string, name_value_list: any[], id?: string): Promise<any> {
    let payload: any = {
      session: await this.loggingSv.session,
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

  entryListToValueList(list: any): any[] {
    return list.entry_list.map((cl: any) => cl.name_value_list).map((c: any) => {
      let newcase: any = {}
      for (let key in c)
        newcase[key] = c[key].value
      return newcase
    });
  }

  objToNameValueList(obj: any) {
    let nameValueList = []
    for (let key in obj) {
      nameValueList.push({ name: key, value: obj[key] })
    }

    return nameValueList
  }



}
