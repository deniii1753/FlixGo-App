import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/IUser';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public fetchErrorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitHandler(form: FormGroup) {
    if(form.invalid) return;

    this.authService.login(form.value)
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

}
