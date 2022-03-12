import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/core/services/characrers/characters.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  characters = [];
  first = 0;
  rows = 10;
  form = this.formBuilder.group({
    gender: '',
    isAlive: '',
  });

  gender = [
    { name: 'None', code: '' },
    { name: 'Male', code: 'Male' },
    { name: 'Female', code: 'Female' },
  ];

  isAlive = [
    { name: 'None', code: '' },
    { name: 'Yes', code: true },
    { name: 'No', code: false },
  ];

  constructor(
    private charactersService: CharactersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters();
    this.initFormFilter();
  }

  initFormFilter() {
    this.form.valueChanges.subscribe(() => {
      this.getCharacters();
    });
  }

  getCharacters() {
    const sessionStorageData = sessionStorage.getItem(
      this.charactersService.getSessionStorageKey(
        this.first.toString(),
        this.rows.toString(),
        this.getControlValue('gender'),
        this.getControlValue('isAlive')
      )
    );
    if (!sessionStorageData) {
      this.charactersService
        .getCharacters(
          this.first.toString(),
          this.rows.toString(),
          this.getControlValue('gender'),
          this.getControlValue('isAlive')
        )
        .subscribe((res: any) => {
          this.characters = res;
        });
    } else {
      this.characters = JSON.parse(sessionStorageData);
    }
  }

  getControlValue(formControlName: string): string {
    return this.form.get(formControlName)?.value;
  }

  next() {
    this.first = this.first + this.rows;
    this.getCharacters();
  }

  prev() {
    if (this.first > 0) {
      this.first = this.first - this.rows;
      this.getCharacters();
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
