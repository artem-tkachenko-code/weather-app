import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faThermometerEmpty, faThermometerFull, faThermometerHalf, faThermometerThreeQuarters, faTint } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  tempHigh = faThermometerFull
  tempLow = faThermometerEmpty
  temp = faThermometerHalf
  feelsLike = faThermometerThreeQuarters
  pressure = faTachometerAlt
  humidity = faTint

  city!: string
  lat!: number
  lon!: number
  date!: Date
  weather: any = <any>{};
  showWeather: boolean = false
  currentDay = moment().format("dddd, Do MMM YYYY")
  currentTime$: Observable<Date> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date)
    }, 1000)
  })


  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude
      this.lon = position.coords.longitude
      this.getCurrentByCoord()
    })
    this.weatherService.city$.subscribe(
      (city) => {
        this.city = city
        this.getCurrent()
      }
    )
    this.currentTime$.subscribe(date => {
      this.date = date
    })
  }

  getCurrentByCoord() {
    this.weatherService.getCurrentWeatherByCoord(this.lat, this.lon).subscribe((res: any) => {
      console.log(res)
      this.weather = res
      this.city = res.name
      this.showWeather = true
    }, err => {
    })
  }

  getCurrent() {
    this.weatherService.getCurrentWeather(this.city).subscribe((res: any) => {
      console.log(res);
      this.weather = res
      this.showWeather = true
    }, err => {
    })
  }


}
