import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Countries } from '../../countries';
import { WeatherService } from '../../weather.service';
import { CountriesInt } from '../interfaces';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  city!: string

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  citiesControl = new FormControl();
  stateGroups: CountriesInt[] = Countries
  stateGroupOptions: Observable<CountriesInt[]> | undefined;

  constructor(private _formBuilder: FormBuilder, private weatherService: WeatherService) { }

  ngOnInit() {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  submitCity() {
    this.weatherService.city$.next(this.stateForm.controls.stateGroup.value)
  }

  private _filterGroup(value: string): CountriesInt[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ country: group.country, city: _filter(group.city, value) }))
        .filter(group => group.city.length > 0);
    } return this.stateGroups;
  }
}