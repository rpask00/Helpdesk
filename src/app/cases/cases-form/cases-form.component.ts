import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Case } from './../../models/case';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-cases-form',
  templateUrl: './cases-form.component.html',
  styleUrls: ['./cases-form.component.scss']
})
export class CasesFormComponent implements OnInit {


  id: string | undefined
  case: Case = new Case()
  users: any[] = []
  states: { key: string, value: string }[] = []
  form = new FormGroup({})


  private statuses: any = {
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

  private isAdmin = false
  private adminControlNames: string[] = ['type', 'state', 'contact_created_by_id', 'data_zamkniecia_c', 'status', 'assigned_user_id']
  private controlNames: string[] = ['name', 'description']

  constructor(
    private route: ActivatedRoute,
    private apiSv: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    let controlOptions: any = { updateOn: "blur", validators: [Validators.required] }


    for (let adminControlName of this.adminControlNames)
      this.form.addControl(adminControlName, new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))


    for (let controlName of this.controlNames)
      this.form.addControl(controlName, new FormControl("", controlOptions))

    // this.form.addControl('type', new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))
    // this.form.addControl('state', new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))
    // this.form.addControl('contact_created_by_id', new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))
    // this.form.addControl('data_zamkniecia_c', new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))
    // this.form.addControl('status', new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))
    // this.form.addControl('assigned_user_id', new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))
    // this.form.addControl('name', new FormControl("", controlOptions))
    // this.form.addControl('', new FormControl("", controlOptions))

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
    if (this.isAdmin)
      for (let adminControlName of this.adminControlNames)
        (this.case as any)[adminControlName] = this.form.controls[adminControlName].value


    for (let controlName of this.controlNames)
      (this.case as any)[controlName] = this.form.controls[controlName].value

  }

  parseStrig(str: string) {
    return str ? $.parseHTML($('<textarea />').html(str).text())[0].textContent : str
  }

}
