import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../model/LoginDTO';
import { RespuestaApi } from '../../model/RespuestaApi';
import { Router } from '@angular/router';
import { TOKEN_NAME, PARAM_USUARIO, REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME } from '../../shared/constants';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  login: LoginDTO;

  constructor(private router: Router,
    private securityService: SecurityService) {
    this.login = new LoginDTO();
   }
  ngOnInit(): void {
  }

  onSubmit() {
    this.securityService.login(this.login).subscribe((data:RespuestaApi)=>{
      if(data.status == 'OK'){
        sessionStorage.setItem(TOKEN_NAME, data.idToken);
        sessionStorage.setItem(REFRESH_TOKEN_NAME, data.refreshToken);
        sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);

        this.securityService.validarToken().subscribe((dato: any)=>{
          sessionStorage.setItem(PARAM_USUARIO, JSON.stringify(dato.body));
          this.router.navigate(["dashboard"]);
        });
      }else{
        /*this.dialog.open(ErrorComponent, {
          width: '60%',
          height: '60%',
          data: { 
            error: data.body,
            dato: data,
            usuario: this.login.username 
          }
        });*/
      }
  }, (error) => {
    /*this.dialog.open(ErrorComponent, {
        width: '60%',
        height: '60%',
        data: { error: error }
      });*/
    });
  }

}
