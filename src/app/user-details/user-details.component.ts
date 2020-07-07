import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  validationMsgs = {
    uname: {
      required: 'UserName is required field',
      minlength: 'UserName should be atleast 2 chars',
      maxlength: 'UserName should be atleast 4 chars'
    },
    email: {
      required: 'Email is required field',
    },
    remember: {
      required: 'Remember is required field'
    },
    contact: {
      required: 'Contact is required field'
    },
    phone: {
      required: 'Phone is required field'
    },
    email1: {
      required: 'Email1 is required field'
    },
    skill: {
      required: 'skill is required field'
    },
    exp: {
      required: 'exp is required field'
    }
  };
  errormsgs = {
    uname: '',
    email: '',
    remember: '',
    contact: '',
    email1: '',
    phone: '',
    skill: '',
    exp: ''
  };
  contactPref = '';
  dataControls = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      email: ['', Validators.required],
      remember: ['', Validators.required],
      contact: ['', Validators.required],
      email1: [''],
      phone: [''],
      skill: this.fb.array([
        this.addFormGroup()
      ])
    })
    this.dataControls = (<FormArray>this.userForm.get('skill')).controls;
    this.userForm.valueChanges.subscribe((d) => {
      this.dataControls = (<FormArray>this.userForm.get('skill')).controls;
      this.validateMsgs()
    })
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required],
      exp: ['', Validators.required]
    })
  }

  validateMsgs(group:FormGroup = this.userForm) {
    Object.keys(group.controls).forEach((key) => {
      const control1 = group.get(key)
      this.errormsgs[key] = '';
      if (control1 instanceof FormArray) {
        for (const iterator1 of control1.controls) {
         if (iterator1 instanceof FormGroup) {
          this.validateMsgs(iterator1);
         }
        }
      } else {
        this.iter(control1, key)
      }

    })
  }
  iter(control, key) {
    if (control.touched && control.errors) {
      for (const key1 in control.errors) {
        this.errormsgs[key] = this.validationMsgs[key][key1];
      }
    }
  }

  addDynFormGroup() {
    (<FormArray>this.userForm.get('skill')).push(this.addFormGroup());
  }

  contactPreference(contact) {
    this.contactPref = contact;
    if (contact === 'phone') {
      this.userForm.get('phone').setValidators(Validators.required)
      this.userForm.get('email1').clearValidators()
    } else {
      this.userForm.get('email1').setValidators(Validators.required)
      this.userForm.get('phone').clearValidators()
    }
    this.userForm.get('email1').updateValueAndValidity();
    this.userForm.get('phone').updateValueAndValidity();

  }
}
