import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Case } from './../../models/case';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {


  cases = new MatTableDataSource<Case>([])
  displayedColumns: string[] = ['check', 'Numer','Edit', 'Temat', 'Aplikacja', 'Status', 'Ważnść',
    'Rodzaj', 'Data wprowadzenia', 'Gwarantowany termin', 'Przydzielona do'];

  checkedList = new Set<string>()

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private apiSv: ApiService
  ) { }

  ngAfterViewInit() {
    if (this.paginator)
      this.cases.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    let casesData = await this.apiSv.getModuleEntries("Cases")
    this.cases.data = casesData.entry_list.map((cl: any) => cl.name_value_list).map((c: any) => {
      let newcase: any = {}
      for (let key in c)
        newcase[key] = c[key].value
      return newcase
    });
  }

  formDate(d: string): string {
    let date = new Date(d)
    date.setHours(date.getHours() + 2)

    return date.toLocaleString()
  }

  check(id: string): void {
    this.checkedList.has(id) ? this.checkedList.delete(id) : this.checkedList.add(id)
  }
}
