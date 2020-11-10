import { Component, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Survey } from '../../model/Survey';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  survey: Survey;
  voted: boolean;

  constructor(private surveyService: SurveyService,
    private snackBar: MatSnackBar) {
    this.survey = new Survey();
   }

  ngOnInit(): void {
    this.surveyService.mensajeRegistro.subscribe((dato) => {
      this.snackBar.open(dato, null, {
        duration: 3500,
      });
    });
  }

  onSubmit() {
    this.surveyService.save(this.survey).subscribe((data)=>{
        this.surveyService.mensajeRegistro.next('Registrado Correctamente...');
        this.voted = true;
    }, (error) => {
      this.surveyService.mensajeRegistro.next('Error al guardar el registro...');
    });
  }

}
