import { Injectable } from '@angular/core';
import { HOST_BACKEND} from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Survey } from '../model/Survey';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  urlSurvey: string = `${HOST_BACKEND}/api/surveys`;
  mensajeRegistro = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router)  { }

    save(loginDTO: Survey){
      loginDTO.userId = 'GUEST';
      return this.http.post(`${this.urlSurvey}/`, loginDTO);
    }

    list(){
      return this.http.get<Survey[]>(`${this.urlSurvey}/`);
    }
}
