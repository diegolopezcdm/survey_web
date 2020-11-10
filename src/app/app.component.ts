import { Component, OnInit } from '@angular/core';
import { SecurityService } from './services/security.service';
import { TOKEN_NAME, ACCESS_TOKEN_NAME } from './shared/constants';
import { RespuestaApi } from './model/RespuestaApi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'survey-app';
  isAdmin: boolean = false;

  constructor(
    private securityService: SecurityService ){
  }

  ngOnInit(){
    setTimeout(() => {
      this.isAdmin = this.securityService.esRoleAdmin();
    },1500);

    setInterval(()=> {
      this.securityService.refreshToken().subscribe((data: RespuestaApi)=>{
        if(data.status == 'OK'){
          sessionStorage.setItem(TOKEN_NAME, data.idToken);
          sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
        }
      });
    },1000 * 60 * 30 );
  } 

}
