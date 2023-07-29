import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-left-nav-bar',
  templateUrl: './main-left-nav-bar.component.html',
  styleUrls: ['./main-left-nav-bar.component.scss'],
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
export class MainLeftNavBarComponent implements OnInit {

  @Output()
  slideEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }


  navigateToRoute(link: string) {

    this.router.navigate(['/dashboard/access/' + link])
      .then(() => {
        this.slide();
      }, error => {
        console.log(error)
        this.slide();
      })
  }

  slide() {
    this.slideEmitter.emit();
  }

}
