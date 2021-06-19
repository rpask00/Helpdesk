import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedoutGuard implements CanActivate {
  constructor(
    private userSv: UserService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      return !(await this.userSv.isLoggedIn())

  }


}
