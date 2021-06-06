import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {


  cases = []
  displayedColumns: string[] = ['Numer', 'Temat', 'Aplikacja', 'Status', 'Ważnść',
    'Rodzaj', 'Data wprowadzenia', 'Gwarantowany termin', 'Przydzielona do'];

  constructor(
    private apiSv: ApiService
  ) {  }

  async ngOnInit() {
    let cases = await this.apiSv.getModuleEntries("Cases")
    this.cases = cases.entry_list.map((c: any) => c.name_value_list);
  }
}
