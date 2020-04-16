import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public usernameInput = new FormControl(null, Validators.required);
  public emailInput = new FormControl(null, [Validators.required, Validators.email]);
  public passwordInput = new FormControl(null, Validators.required);
  public passwordConfirmInput = new FormControl(null, [Validators.required]);
  public firstnameInput = new FormControl(null);
  public lastnameInput = new FormControl(null);
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

  public submitted: boolean = false;

  constructor(private userService: UserService) {}

  static MatchPassword(control: AbstractControl) {
    return control.get('passwordInput').value === control.get('passwordConfirmInput').value
      ? null
      : { missmatch: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

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
    }

    this.userService
      .create(user, this.registerForm.get('passwordInput').value)
      .subscribe();
  }
}
