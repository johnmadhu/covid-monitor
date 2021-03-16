import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,
    private authService: AuthService) { 
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  submit(){
    let res= this.authService.userValid(this.form.value["username"], this.form.value["password"])
    if(res){
      localStorage.setItem('uname',this.form.value["username"]);
      localStorage.setItem('pword',this.form.value["password"]);
      this.router.navigate(['/home']);
    }
    else
    {
        alert('invaliddd')
    }
    
  }
  ngOnInit(): void {
     
  }
}
