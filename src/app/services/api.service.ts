import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as $ from "jquery";
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://hdropczyce.e-bi.pl/service/v4_1/rest.php"

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
}
