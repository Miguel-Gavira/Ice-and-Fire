import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService
  ) {}

  login() {
    const username = this.form.get('username') as AbstractControl;
    const password = this.form.get('password') as AbstractControl;
    if (this.form.valid) {
      this.jwtService
        .getToken(username?.value, password?.value)
        .pipe(
          tap(
            (res) => res.error && this.inputsAreInvalid([username, password])
          ),
          filter((res) => !res.error)
        )
        .subscribe((token) => {
          this.jwtService.setToken(token);
          this.router.navigate(['list']);
        });
    } else {
      this.inputsMarkAsDirty([username, password]);
    }
  }

  inputsMarkAsDirty(inputs: AbstractControl[]) {
    for (const input of inputs) {
      input?.markAsDirty();
    }
  }

  inputsAreInvalid(inputs: AbstractControl[]) {
    for (const input of inputs) {
      input?.setErrors({ invalid: true });
    }
    this.inputsMarkAsDirty(inputs);
  }

  hasError(formControlName: string, error: string): boolean {
    const control = this.form.get(formControlName) as AbstractControl;
    return control?.hasError(error) && control?.dirty;
  }
}
