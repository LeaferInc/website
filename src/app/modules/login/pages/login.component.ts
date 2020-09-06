import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public usernameInput = new FormControl('', Validators.required);
  public passwordInput = new FormControl('', Validators.required);

  public loginForm = new FormGroup({
    usernameInput: this.usernameInput,
    passwordInput: this.passwordInput
  });

  public loginIsLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit() {
    this.loginIsLoading = true;

    for (const key in this.loginForm.controls) {
      this.loginForm.controls[key].markAsDirty();
      this.loginForm.controls[key].updateValueAndValidity();
    }

    if(this.loginForm.invalid) {
      return;
    }

    const usernameValue = this.usernameInput.value;
    const passwordValue = this.passwordInput.value;

    this.authService.login(String(usernameValue), passwordValue)
      .pipe(
        finalize(() => this.loginIsLoading = false)
      )
      .subscribe({
        next: () => this.router.navigate(['']),
      });
  }
}
