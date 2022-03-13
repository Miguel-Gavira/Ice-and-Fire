import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Subscription, tap } from 'rxjs';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
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

  ngOnInit(): void {
    if (this.jwtService.validToken()) {
      this.router.navigate(['list']);
    }
  }

  login() {
    const username = this.form.get('username') as AbstractControl;
    const password = this.form.get('password') as AbstractControl;
    if (this.form.valid) {
      this.subscriptions.push(
        this.jwtService.getToken(username?.value, password?.value).subscribe({
          next: (token) => {
            this.jwtService.setToken(token);
            this.router.navigate(['list']);
          },
          error: () => {
            this.inputsAreInvalid([username, password]);
          },
        })
      );
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
