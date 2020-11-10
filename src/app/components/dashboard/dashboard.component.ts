import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../model/Dashboard';
import { Survey } from '../../model/Survey';
import { DashboardService } from '../../services/dashboard.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard[];
  surveys: Survey[];
  displayedColumns: string[] = [ 'firstName', 'lastName', 'preference'];

  constructor(private dashboardService: DashboardService,
    private surveyService: SurveyService) {
   }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    this.dashboardService.getSurveyResults().subscribe((datos)=>{
      this.dashboard = datos;
    });

    this.surveyService.list().subscribe((datos)=>{
      this.surveys = datos;
    });
  }

}
