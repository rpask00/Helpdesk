import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './../models/user';
import { take } from 'rxjs/operators';
import * as $ from "jquery";
import { readCookie } from 'src/common/utility';
import { setCookie, nameValueToObj } from './../../common/utility';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://hdropczyce.e-bi.pl/service/v4_1/rest.php"
  private userSub$: BehaviorSubject<User> = new BehaviorSubject({} as User);

  constructor() { }

  ngOnInit() {
    this.initializeUser()
  }

  async initializeUser() {
    let ssid = readCookie("PHPSESSID")
    let userid = readCookie("USERID")
    if (ssid && userid)
      this.userSub$.next(await this.fetchUser(ssid, userid))
  }

  async login(user_name: string, password: string) {
    let result = await $.post(this.url, {
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


    if (result.id) {
      let userid = result.name_value_list.user_id.value
      this.userSub$.next(await this.fetchUser(result.id, userid))
      setCookie("PHPSESSID", result.id, 24)
      setCookie("USERID", userid, 24)
    }
  }

  async logout() {
    let session = readCookie("PHPSESSID")

    if (session)
      await $.post(this.url, {
        method: "logout",
        rest_data: JSON.stringify({ session:this.session })
      })

    this.userSub$.next({} as User)
    setCookie("PHPSESSID", "", 0)
    setCookie("USERID", "", 0)
  }

  private async fetchUser(session: string, id: string): Promise<User> {
    let result = await $.post(this.url, {
      method: "get_entry",
      input_type: "JSON",
      response_type: "JSON",
      rest_data: JSON.stringify({
        session,
        module_name: "Users",
        id,
      })
    })

    return nameValueToObj(result.entry_list[0].name_value_list) as User

  }


  get session() {
    return readCookie("PHPSESSID")
  }

  get user$() {
    return this.userSub$.asObservable();
  }

  get user(): Promise<User> {
    return new Promise(resolve => {
      this.userSub$.pipe(take(1)).subscribe(resolve);
    })
  }

  async isLoggedIn() {
    let user = await this.user
    if (!user.id) {
      await this.initializeUser()
      let user = await this.user
      return !!user.id

    }
    return true
  }
}
