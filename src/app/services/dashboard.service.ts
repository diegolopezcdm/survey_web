import { Injectable } from '@angular/core';
import { HOST_BACKEND} from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Dashboard } from '../model/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  urlDashboard: string = `${HOST_BACKEND}/api/dashboard/`;

  constructor(
    private http: HttpClient,
    private router: Router)  { }

    getSurveyResults() {
      return this.http.get<Dashboard[]>(`${this.urlDashboard}`);
    }
}
