import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ApplicationUserLogin } from '../../models/account/application-user-login.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private lf = inject(FormBuilder)
  loginForm: FormGroup | any;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {

    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.lf.group({
      username: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]]
    });
  }

  isTouched(field: string): boolean {
    return this.loginForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.loginForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.loginForm.get(field).hasError(error);
  }

  onSubmit() {
    let applicationUserLogin: ApplicationUserLogin = new ApplicationUserLogin(
      this.loginForm.get("username").value,
      this.loginForm.get("password").value
    );

    this.accountService.login(applicationUserLogin).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
