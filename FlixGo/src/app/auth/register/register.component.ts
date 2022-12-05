import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from 'src/app/shared/interfaces/IUser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public fetchErrorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^(.+)@(.+)$')]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: '',
      }, { validators: [this.passwordConfirmer] })
    });
  }

  submitHandler(form: FormGroup) {
    if(form.invalid) return;
    const {username, email, passwords} = form.value;
    
    this.authService.register({
      username, 
      email, 
      password: passwords.password
    })
      .subscribe({
        next: (user) => {
            this.authService.user = user as IUser;
            this.router.navigate(['/home']);
        },
        error: (err) => {
          this.fetchErrorMessage = err.message;
        }
      })
  }

  passwordConfirmer(c: AbstractControl): { passwordMatch: { match: boolean } } | null {
    if (c.get('password')?.value !== c.get('rePassword')?.value) return { passwordMatch: { match: false } };
    return null;
  }
}
