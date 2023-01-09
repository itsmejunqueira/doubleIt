import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TProducts } from '../models/product.model';

@Injectable()
export class ProductsService {

  productList: TProducts[] = [
    {
      id: 1,
      photo: "../../assets/MacBook_Pro_16.png",
      name: "MacBook Pro 2021 16'",
      description: "MacBook Pro com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 17.499,00",
      tags: ["Apple", "MacBook"]
    },
    {
      id: 2,
      photo: "../../assets/MacBook_ Air_256.jpg",
      name: "MacBook Air 256GB 2020",
      description: "MacBook Air com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 10.499,00",
      tags: ["Apple", "MacBook"]
    },
    {
      id: 3,
      photo: "../../assets/MacBook_ Air_512.jpg",
      name: "MacBook Air 512 GB 2021",
      description: "MacBook Air com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 13.499,00",
      tags: ["Apple", "MacBook"]
    },
    {
      id: 4,
      photo: "../../assets/MacBook_Pro_2019.jpg",
      name: "MacBook Pro 2019 16'",
      description: "MacBook Pro com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 12.499,00",
      tags: ["Apple", "MacBook"]
    },
  ]

  constructor() { }

  public getAllproducts(): Observable<TProducts[]> {
    return of(this.productList);
  }

  public AddProduct(product: TProducts): Observable<any>{
    this.productList.push(product)
    return of(product);
  }

  public EditProduct(product: TProducts): Observable<any>{
    const itemIndex = this.productList.findIndex(x => x.id == product.id);
    if(itemIndex>=0){
      this.productList[itemIndex] = product;
      return of(product);
    }
    return throwError(()=> new Error("produto não encontrado"))
  }
  
  public DeleteProduct(product: TProducts): Observable<any>{
    const itemIndex = this.productList.findIndex(x => x.id == product.id);
    if(itemIndex>=0){
      this.productList.splice(itemIndex,1);
      return of(product);
    }
    return throwError(()=> new Error("produto não encontrado"))
  }
}