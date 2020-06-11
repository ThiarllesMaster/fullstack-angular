import { Injectable, ErrorHandler } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 baseUrl = " http://localhost:3000/products" 

  constructor(private matSnackBar:MatSnackBar, private httpClient:HttpClient) { }

  showMessage(msg:string, isError: boolean = false):void {
    this.matSnackBar.open(msg, 'X', {
      duration:3000, 
      horizontalPosition: "right",
      verticalPosition:"top", 
      panelClass: isError ? ['msg-error']:['msg-success']
    })
  }

  createProduct(product:Product):Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj ), 
      catchError(e => this.handleError(e))
    )
  }

  
  readProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj ), 
      catchError(e => this.handleError(e))
      )
    }
    
    readById(id : number):Observable<Product> {
      const URL = `${this.baseUrl}/${id}`
      return this.httpClient.get<Product>(URL).pipe(
        map(obj => obj ), 
        catchError(e => this.handleError(e))
        )
      }
      
      update(product:Product):Observable<Product> {
        const URL = `${this.baseUrl}/${product.id}`
        return this.httpClient.put<Product>(URL, product).pipe(
          map(obj => obj ), 
          catchError(e => this.handleError(e))
          )
        }
        delete(id:number):Observable<Product> {
          const URL = `${this.baseUrl}/${id}`
          return this.httpClient.delete<Product>(URL).pipe(
            map(obj => obj ), 
            catchError(e => this.handleError(e))
            )
          }
          
          handleError(error:any): Observable<any> {
            console.log(error)
            this.showMessage('Happened one error!', true)
            return EMPTY
          }
        }
