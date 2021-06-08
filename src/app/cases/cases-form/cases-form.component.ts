import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Case } from './../../models/case';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import * as $ from "jquery";

@Component({
  selector: 'app-cases-form',
  templateUrl: './cases-form.component.html',
  styleUrls: ['./cases-form.component.scss']
})
export class CasesFormComponent implements OnInit {


  id: string | undefined
  case = new Case()
  users: any[] = []
  statuses: any = {
    "Open": [
      { key: "Open_New", value: "Nowy" },
      { key: "Open_Assigned", value: "W realizacji" },
      { key: "Open_Frozen", value: "Zamrożone" },
    ],
    "Closed": [
      { key: "Closed_Completed", value: "Zrealizowane" },
      { key: "Closed_Canceled", value: "Anulowane" },
      { key: "Closed_NonAction", value: "Zaniechane" },
    ],
    "": []
  }
  states: { key: string, value: string }[] = []
  form = new FormGroup({})

  constructor(
    private route: ActivatedRoute,
    private apiSv: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    for (let key in this.case)
      this.form.addControl(key, new FormControl("", { updateOn: "blur", validators: [Validators.required] }))

    this.id = this.route.snapshot.params['id']
    if (this.id)
      this.case = this.apiSv.entryListToValueList(await this.apiSv.getEntry("Cases", this.id))[0]

    this.users = this.apiSv.entryListToValueList(await this.apiSv.getModuleEntries("Users"))

    for (let key in this.case)
      this.form.patchValue({ [key]: (this.case as any)[key] })

    this.form.patchValue({ data_zamkniecia_c: new Date(this.case.data_zamkniecia_c) })
    this.form.patchValue({ description: this.parseStrig(this.case.description) })

    this.states = this.statuses[this.form.controls["state"].value]
    this.form.controls["state"].valueChanges.subscribe(s => {
      this.form.patchValue({ status: "" })
      this.states = this.statuses[s]
    })
  }


  submit() {

  }

  parseStrig(str: string) {
    return $.parseHTML($('<textarea />').html(str).text())[0].textContent;
  }

}
