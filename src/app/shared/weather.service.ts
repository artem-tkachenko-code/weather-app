import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    city$: Subject<any> = new Subject<any>()

    constructor(private http: HttpClient) { }

    getCurrentWeather(city: string) {
        return this.http.get(`${environment.apiUrl}/weather?q=${city}&appid=${environment.apiKey}`).pipe(
            catchError(error => {
                return throwError(error)
            }))
    }

    getForecast(city: string) {
        return this.http.get(`${environment.apiUrl}/forecast?q=${city}&appid=${environment.apiKey}`).pipe(
            catchError(error => {
                return throwError(error)
            }))
    }

    getCurrentWeatherByCoord(lat: number, lon: number) {
        return this.http.get(`${environment.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`).pipe(
            catchError(error => {
                return throwError(error)
            }))
    }
}