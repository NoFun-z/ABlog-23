import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApplicationUserCreate } from '../../models/account/application-user-create.model';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private rf = inject(FormBuilder)
  registerForm: FormGroup | any;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.rf.group({
      fullname: [null, [
        Validators.minLength(10),
        Validators.maxLength(30)
      ]],
      username: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
        Validators.maxLength(30)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      confirmPassword: [null, [
        Validators.required
      ]],
    }, {
      validators: this.matchValue
    });
  }

  formHasError(error: string) {
    return !!this.registerForm.hasError(error);
  }

  isTouched(field: string) {
    return this.registerForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.registerForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.registerForm.get(field).hasError(error);
  }

  matchValue: ValidatorFn = (fg: FormGroup | any) => {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { isNotMatching: true };
  }

  onSubmit() {
    let applicationUserCreate: ApplicationUserCreate = new ApplicationUserCreate(
      this.registerForm.get("username").value,
      this.registerForm.get("password").value,
      this.registerForm.get("email").value,
      this.registerForm.get("fullname").value,
    );

    this.accountService.register(applicationUserCreate).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }
}
