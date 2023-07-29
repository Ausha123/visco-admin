import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoaderService} from "../service/core/loader-service/loader.service";

@Injectable()
export class HttpManagerInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Progress_Type') === 'BAR') {
      this.loaderService.mainProgressLoading.next(true);
    }
    if (request.headers.get('Progress_Type') === 'SPINNER') {
      this.loaderService.mainSpinnerLoading.next(true);
    }
    if (request.headers.get('Progress_Type') === 'SUB_SPINNER') {
      this.loaderService.subSpinnerLoading.next(true);
    }
    if (request.headers.get('Progress_Type') === 'SUB_SPINNER_ONE') {
      this.loaderService.subSpinnerOneLoading.next(true);
    }
    console.log('xxx')
    if (request.headers.get('Progress_Type') === 'BAR_SUB_ONE') {
      this.loaderService.subProgressOneLoading.next(true);
    }
    if (request.headers.get('Progress_Type') === 'BAR_SUB_TWO') {
      this.loaderService.subProgressTwoLoading.next(true);
    }
    if (request.headers.get('Progress_Type') === 'BAR_SUB_THREE') {
      this.loaderService.subProgressThreeLoading.next(true);
    }
    return next.handle(request).pipe(
      finalize(
        ()=>{
          this.loaderService.mainProgressLoading.next(false);
          this.loaderService.mainSpinnerLoading.next(false);
          this.loaderService.subSpinnerLoading.next(false);
          this.loaderService.subProgressOneLoading.next(false);
          this.loaderService.subProgressTwoLoading.next(false);
          this.loaderService.subProgressThreeLoading.next(false);
          this.loaderService.subSpinnerOneLoading.next(false);
        }
      )
    );
  }
}
