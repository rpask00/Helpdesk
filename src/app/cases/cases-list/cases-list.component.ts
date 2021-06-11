import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Case, CaseFilters } from './../../models/case';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {


  cases = new MatTableDataSource<Case>([])
  allCases: Case[] = []
  displayedColumns: string[] = ['check', 'Numer', 'Edit', 'Temat', 'Aplikacja', 'Status', 'Ważnść',
    'Rodzaj', 'Data wprowadzenia', 'Gwarantowany termin', 'Przydzielona do'];

  checkedList = new Set<string>()
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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private apiSv: ApiService
  ) { }

  ngAfterViewInit() {
    if (this.paginator)
      this.cases.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.allCases = this.apiSv.entryListToValueList(await this.apiSv.getModuleEntries("Cases"))
    this.cases.data = this.allCases
  }

  formDate(d: string): string {
    let date = new Date(d)
    date.setHours(date.getHours() + 2)

    return date.toLocaleString()
  }

  check(id: string): void {
    this.checkedList.has(id) ? this.checkedList.delete(id) : this.checkedList.add(id)
  }

  filterCases(filters: any) {
    let cases = this.allCases
    cases = cases.filter((c: any) => {

      for (let filter in filters) {
        if (!filters[filter])
          continue

        if (filter == "waznosc_c") {
          if (c[filter] != filters[filter])
            return false

          continue
        }

        if (c[filter].toLowerCase().indexOf(filters[filter].toLowerCase()) == -1) return false
      }

      return true
    })

    this.cases.data = cases
  }
}