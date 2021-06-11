import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-case-comments',
  templateUrl: './case-comments.component.html',
  styleUrls: ['./case-comments.component.scss']
})
export class CaseCommentsComponent implements OnInit {

  @Input('caseId') caseId: string = ''
  newcomment: FormControl
  comments: { name: string, content: string, date: string }[] = []
  constructor() {
    this.newcomment = new FormControl('')
  }

  ngOnInit(): void {
  }

  addComment() {
    this.comments.push({
      name: "324234",
      content: "ASfasefas",
      date: (new Date()).toLocaleString()
    })

    this.newcomment.reset()
  }

}
