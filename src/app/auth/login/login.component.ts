import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any;
  senha: any;
  formlogin: FormGroup;
  returnUrl: string;
  hasError: boolean;

    constructor(
      private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }


  loadForm() {
    this.formlogin = this.fb.group({
      login: ["", Validators.compose([Validators.required])],
      senha: ["", Validators.compose([Validators.required])],
    });
  }

  submit() {
    this.hasError = false;
    this.authService.login(this.formlogin.value.login, this.formlogin.value.senha)
      .subscribe((user) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
  }
}
