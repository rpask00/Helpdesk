import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as $ from "jquery";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private url = "http://hdropczyce.e-bi.pl/service/v4_1/rest.php"
  private sessionSub$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    let ssid = this.readCookie("PHPSESSID")
    if (ssid) this.sessionSub$.next(ssid)
  }

  async login(user_name: string, password: string) {
    let user = await $.post(this.url, {
      method: "login",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        user_auth: {
          user_name,
          password: CryptoJS.MD5(password).toString()
        }
      })
    })

    if (user.id) {
      this.sessionSub$.next(user.id)
      this.setCookie("PHPSESSID", user.id, 24)
    }
  }

  async logout() {
    let session = this.readCookie("PHPSESSID")

    if (session)
      await $.post(this.url, {
        method: "logout",
        rest_data: JSON.stringify({ session })
      })

    this.sessionSub$.next("")
    this.setCookie("PHPSESSID", "", 0)
  }

  get session$() {
    return this.sessionSub$.asObservable();
  }

  get session(): Promise<string> {
    return new Promise(resolve => {
      this.sessionSub$.pipe(take(1)).subscribe(resolve);
    })
  }


  private setCookie(c_name: string, value: any, exhours: number) {
    var exdate = new Date();
    exdate.setHours(exdate.getHours() + exhours);
    var c_value = escape(value) + ((exhours == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + "; path=/";
  }

  private readCookie(name: string) {
    var cookise = document.cookie.split(';');
    for (let c of cookise) {
      let cs = c.split('=')
      if (cs[0] == name)
        return cs[1]
    }
    return null;
  }

}
