import { AfterViewChecked } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-case-comments',
  templateUrl: './case-comments.component.html',
  styleUrls: ['./case-comments.component.scss']
})
export class CaseCommentsComponent implements OnInit, AfterViewChecked {

  @Input('caseId') caseId: string = ''

  newcomment: string = ""
  comments: { name: string, content: string, date: string }[] = []
  imagesCount: number = 0

  @ViewChild('commentBox') commentBox!: ElementRef<HTMLDivElement>

  constructor(
    public dialog: MatDialog,
    private userSv: UserService
  ) { }

   ngOnInit() {}

  async addComment() {
    if (!this.newcomment)
      return

    this.comments.push({
      name: (await this.userSv.user).name,
      content: this.newcomment,
      date: (new Date()).toLocaleString()
    })
    this.newcomment = ""
  }


  ngAfterViewChecked() {
    let newimages = this.commentBox?.nativeElement.querySelectorAll('.comment-content img')
    if (newimages && (newimages.length != this.imagesCount)) {
      newimages[newimages.length - 1].addEventListener('click', e => {
        let img = new Image()
        img.src = (e.target as HTMLImageElement).src
        this.dialog.open(ImageDialogComponent, {
          // width: Math.min(img.width, innerWidth-300) + 'px',
          data: {
            imgSrc: img.src,
          }
        })
      })
      this.imagesCount = newimages.length
    }
  }
}
