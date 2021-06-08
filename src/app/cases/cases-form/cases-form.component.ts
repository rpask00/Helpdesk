import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Case } from './../../models/case';

@Component({
  selector: 'app-cases-form',
  templateUrl: './cases-form.component.html',
  styleUrls: ['./cases-form.component.scss']
})
export class CasesFormComponent implements OnInit {

  id: string | undefined
  case = new Case()

  constructor(
    private route: ActivatedRoute,
    private apiSv: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      let caseData = (await this.apiSv.getEntry("Cases", this.id)).entry_list[0].name_value_list
      let newcase: any = {}
      for (let key in caseData)
        newcase[key] = caseData[key].value
      this.case = newcase
    }
    // this.case = await this.apiSv.getEntry("Cases", this.id)

    console.log(this.case);


  }

}
