import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {


  constructor(
    private apiSv: ApiService
  ) { }

  async ngOnInit() {

    console.log(await this.apiSv.getCasesList());

  }
}
