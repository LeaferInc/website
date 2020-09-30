import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public usernameInput = new FormControl(null, Validators.required);
  public emailInput = new FormControl(null, [Validators.required, Validators.email]);
  public passwordInput = new FormControl(null, Validators.required);
  public passwordConfirmInput = new FormControl(null, [Validators.required]);
  public firstnameInput = new FormControl(null, [Validators.required]);
  public lastnameInput = new FormControl(null, [Validators.required]);
  // public locationInput = new FormControl(null);
  // public birthdateInput = new FormControl(null);
  // public biographyInput = new FormControl(null);
  // public photoInput = new FormControl(null);

  public registerForm = new FormGroup(
    {
      usernameInput: this.usernameInput,
      emailInput: this.emailInput,
      passwordInput: this.passwordInput,
      passwordConfirmInput: this.passwordConfirmInput,
      firstnameInput: this.firstnameInput,
      lastnameInput: this.lastnameInput,
      // locationInput: this.locationInput,
      // birthdateInput: this.birthdateInput,
      // biographyInput: this.biographyInput,
      // photoInput: this.photoInput,
    },
    {
      validators: RegisterComponent.MatchPassword,
    }
  );

  public registerIsLoading = false;

  private sub: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  static MatchPassword(control: AbstractControl) {
    return control.get('passwordInput').value === control.get('passwordConfirmInput').value
      ? null
      : { missmatch: true };
  }

  onSubmit() {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.registerIsLoading = true;

    const usernameValue = this.usernameInput.value;
    const emailValue = this.emailInput.value;
    const firstnameValue = this.firstnameInput.value;
    const lastnameValue = this.lastnameInput.value;
    // const locationValue = this.locationInput.value;
    // const birthdateValue = this.birthdateInput.value;

    const user: User = {
      username: usernameValue ? String(usernameValue) : null,
      email: emailValue ? String(emailValue) : null,
      firstname: firstnameValue ? String(firstnameValue) : null,
      lastname: lastnameValue ? String(lastnameValue) : null,
      // location: locationValue ? String(locationValue) : null,
      // birthdate: birthdateValue ? null : null,
    };

    this.sub.add(
      this.userService
        .create(user, this.passwordInput.value)
        .pipe(finalize(() => (this.registerIsLoading = false)))
        .subscribe({
          next: () => this.router.navigate(['login']),
        })
    );
  }
}
