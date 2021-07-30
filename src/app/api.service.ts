import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppeal } from './appeal-page/appeal-page.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  preFetchData(): Observable<Object> {
    return this.http.get<Object>('/orders/getAllOrders');
  }

  fetchData(skip: number, take: number): Observable<IAppeal[]> {
    return this.http.get<IAppeal[]>(`/orders/getAllOrders/${skip}/${take}`);
  }

  postData(appeal: IAppeal): Observable<IAppeal> {
    return this.http.post<IAppeal>('/orders/createOrder', appeal);
  }

  deleteData(idx?: number) {
    return this.http.delete<IAppeal>(`/orders/deleteOrder/${idx}`)
  }
}
