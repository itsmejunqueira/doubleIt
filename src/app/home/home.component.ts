import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string = '';
  constructor(private authService: AuthService,) { }

  ngOnInit(): void { 
    this.name = this.authService.getUserFromLocalStorage();
  }
 

}
