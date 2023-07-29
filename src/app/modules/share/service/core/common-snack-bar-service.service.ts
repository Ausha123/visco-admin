import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CommonSnackBarService {

  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {
  }

  public warningSnackBar(message: string, action: any, otherData: Array<any>) {
    this.zone.run(() => {
      this._snackBar.open(message, action, {
        duration: otherData[0],
        panelClass: [otherData[1]]
      });
    });

  }

  public successSnackBar(message: string, action: any, otherData: Array<any>) {
    this.zone.run(() => {
      this._snackBar.open(message, action, {
        duration: otherData[0],
        panelClass:[otherData[1]]
      });
    });

  }

  public trigger(message: string, action: string, otherData: Array<any>) {
    this.zone.run(() => {
      this._snackBar.open(message, action, {
        duration: otherData[0],
        panelClass: otherData[1],
        horizontalPosition: otherData[2],
        verticalPosition: otherData[3]

      });
    });
  }
}
