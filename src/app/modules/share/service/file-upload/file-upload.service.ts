import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }

  upload(formData: FormData):Observable<any> {
    return this.http.post("http://localhost:9090/api/v1/file/upload", formData, {responseType: 'text'});
  }
}
