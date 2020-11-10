import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private serviceSecurity: SecurityService) { }

  ngOnInit() {
    this.serviceSecurity.cerrarSesion();
  }

}
