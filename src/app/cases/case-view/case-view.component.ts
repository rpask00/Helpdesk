import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Case } from './../../models/case';
import * as $ from "jquery";

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements OnInit {

  public id: string
  public case = new Case()

  types: any = {
    "Major": "Serwisowanie (błąd, awaria)",
    "Modification": "Zmiana (CR)",
    "Training": "Wsparcie i administrowanie",
  }

  statuses: any = {
    "Closed_Completed": "Zrealizowane",
    "Open_New": "Nowy",
    "Closed_Canceled": "Anulowane",
    "Open_Assigned": "W realizacji",
    "Open_Frozen": "Zamrożone",
    "Closed_NonAction": "Zaniechane",
  }
  states: any = {
    "Open": "Otwarty",
    "Closed": "Zamknięty",
    "": "Ponownie otwarty",
  }

  constructor(
    router: Router,
    route: ActivatedRoute,
    private apiSv: ApiService,
  ) {
    this.id = route.snapshot.params['id']

    if (!this.id)
      router.navigateByUrl("/cases/list")
  }

  async ngOnInit() {
    this.case = this.apiSv.entryListToValueList(await this.apiSv.getEntry("Cases", this.id))[0]


    console.log(this.case);
  }

  decodeHtml(html: string) {
    return $('<textarea />').html(html).text();
  }

}
