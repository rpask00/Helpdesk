import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsloggedoutGuard implements CanActivate {
  constructor(
    private userSv: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.userSv.user$.pipe(take(1)).subscribe(u => resolve(u == ""))
    });

  }

}
