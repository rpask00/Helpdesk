import { AfterViewChecked } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-case-comments',
  templateUrl: './case-comments.component.html',
  styleUrls: ['./case-comments.component.scss']
})
export class CaseCommentsComponent implements OnInit, AfterViewChecked {

  @Input('caseId') caseId: string = ''

  newcomment: string = ""
  comments: { name: string, content: string, date: string }[] = []
  images: Element[] = []
  @ViewChild('commentBox') commentBox!: ElementRef<HTMLDivElement>

  constructor() { }

  ngOnInit(): void {
  }

  addComment() {
    this.comments.push({
      name: "324234",
      content: this.newcomment,
      date: (new Date()).toLocaleString()
    })
    this.newcomment = ""
  }


  ngAfterViewChecked() {
    let newimages = this.commentBox?.nativeElement.querySelectorAll('.comment-content img')
    if (newimages && (newimages.length != this.images.length)) {
      this.images = Array.from(newimages)
      this.images.forEach(img => img.addEventListener('click', () => console.log('object')))
    }
  }
}
