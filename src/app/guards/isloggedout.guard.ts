import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoggingService } from './../services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedoutGuard implements CanActivate {
  constructor(
    private loggingSv: LoggingService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    return new Promise((resolve) => this.loggingSv.session.then(s => resolve(s == "")));
  }

  
}
