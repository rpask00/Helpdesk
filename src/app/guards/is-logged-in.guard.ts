import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSv: UserService,

  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (await this.userSv.isLoggedIn())
      return true

    this.router.navigateByUrl("/login")
    return false
  }
}
