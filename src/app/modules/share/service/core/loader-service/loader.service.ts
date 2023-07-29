import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public mainSpinnerLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public mainProgressLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public subSpinnerLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public subSpinnerOneLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public subProgressOneLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public subProgressTwoLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public subProgressThreeLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public subProgressFourLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
  }
}
