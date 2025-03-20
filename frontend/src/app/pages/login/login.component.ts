import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { username, password } = this.form.value;

    if (username && password) {
      this.authService.login(username, password).subscribe();
    }
  }
}
