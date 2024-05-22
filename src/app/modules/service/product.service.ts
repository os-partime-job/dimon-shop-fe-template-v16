import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDTO } from "../_models/productDTO";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl =environment.apiUrl;

  httpOptions: any;
  token : any;
  BASIC_DIAMOND_URL = "diamond/";
  BASIC_JEWELRY_URL = "jewelry/";


  constructor(private http: HttpClient, private storageService : StorageService) {
    this.token = storageService.getUser().access_token;
    console.log(this.token)
    this.httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ` + this.token,
    }),
    "Access-Control-Allow-Origin": `${environment.apiUrl}`,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
}; }

  public getProducts(request: any): Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/jewelry/list`,request, this.httpOptions);
  }
  public addProduct(Product : any): Observable<any>{
    return this.http.post<ProductDTO>(`${this.apiUrl}/api/product/addProduct`,Product,this.httpOptions);
  }
  public updateProduct(Product : any): Observable<any>{
    return this.http.put<ProductDTO>(`${this.apiUrl}/api/product/update`,Product,this.httpOptions);
  }
  public deleteProduct(ProductId : number): Observable<any>{
    return this.http.delete<void>(`${this.apiUrl}/api/product/delete/${ProductId}`,this.httpOptions);
  }
  public getTest(): Observable<any>{
    return this.http.get<Object>(`${this.apiUrl}/api/product/test`, this.httpOptions);
  }
  public getProductDetail(ProductId : number): Observable<any>{
    const body = {id_jewelry:ProductId};
    return  this.http.post<Object>(`${this.apiUrl}/${this.BASIC_JEWELRY_URL}detail`,body, this.httpOptions);
  }
}
