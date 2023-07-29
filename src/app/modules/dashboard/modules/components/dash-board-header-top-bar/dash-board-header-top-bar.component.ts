import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dash-board-header-top-bar',
  templateUrl: './dash-board-header-top-bar.component.html',
  styleUrls: ['./dash-board-header-top-bar.component.scss'],
  animations: [
    trigger('searchSlider', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.2s')
      ]),
      transition('* => void', [
        animate('0.2s', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class DashBoardHeaderTopBarComponent implements OnInit {

  searchVisibleState = false;
  searchVisibleVerifyState = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(window.innerWidth)
    if (window.innerWidth >= 755) {
      this.searchVisibleState = true;
    } else if (window.innerWidth <= 754) {
      if (!this.searchVisibleVerifyState) {
        this.searchVisibleState = false;
      }
    }
  }

  @Output()
  slideEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (window.innerWidth >= 755) {
      this.searchVisibleState = true;
    }
  }

  slide() {
    this.slideEmitter.emit();
  }

  toggleSearch() {
    if (window.innerWidth <= 754) {
      this.searchVisibleState = !this.searchVisibleState;
      this.searchVisibleVerifyState = !this.searchVisibleVerifyState;
    }
  }

  userName: string = '';
  avatar: string = '';

  signOut() {
    location.reload();
  }
}
