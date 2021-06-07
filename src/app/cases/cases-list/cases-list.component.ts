import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ApiService } from './../../services/api.service';
import { Case } from './../../models/case';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {


  cases = new MatTableDataSource<Case>()
  displayedColumns: string[] = ['check', 'Numer', 'Temat', 'Aplikacja', 'Status', 'Ważnść',
    'Rodzaj', 'Data wprowadzenia', 'Gwarantowany termin', 'Przydzielona do'];

  constructor(
    private apiSv: ApiService
  ) { }

  async ngOnInit() {
    let casesData = await this.apiSv.getModuleEntries("Cases")
    casesData = casesData.entry_list.map((cl: any) => cl.name_value_list).map((c: any) => {
      let newcase: any = {}
      for (let key in c)
        newcase[key] = c[key].value
      return newcase
    });

    this.cases.data = casesData
  }

  formDate(d: string) {
    let date = new Date(d)
    date.setHours(date.getHours() + 2)

    return date.toLocaleString()
  }
}
