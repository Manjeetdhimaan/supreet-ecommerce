import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { ProductResponse, ProductsResponse, ServerResponse } from '../models/responses.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productBaseUrl = `${environment.apiBaseUrl}/products`;

  products: Product[] = [
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/1.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p2',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/2.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 10,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/3.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 20,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/4.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: 'new',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/5.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 30,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: 'new',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/6.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/7.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p1',
      name: 'Jocky Men Underwear',
      label: 'new',
      richDescription: '',
      description: '',
      imageSrc: 'assets/images/demos/demo2/products/8.jpg',
      images: [],
      colors: [''],
      weight: [''],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      countInStock: 10,
      rating: 4,
      numReviews: 40,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        imgSrc: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
  ];

  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: string[], productsIds?: string[]): Observable<ProductsResponse> {
    let params = new HttpParams()
    if(categoriesFilter) {
      // params = params.append('categories', categoriesFilter.join(','))
      // or below approach //
      return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products?categories=${categoriesFilter}`);
    }
    if(productsIds) {
      return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products?productsIds=${productsIds}`);
    }
    // return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products`, {params: params});
    return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products`);
  }

  getFeaturedProducts(count: number, sort: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-featured-products/${count}/${sort}`);
  }

  getProduct(productId: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.productBaseUrl}/get-product/${productId}`);
  }

  postProduct(productBody: FormData): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.productBaseUrl}/post-product`, productBody);
  }

  updateProduct(productId: string, productBody: FormData): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.productBaseUrl}/update-product/${productId}`, productBody);
  }

  deleteProduct(productId: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.productBaseUrl}/delete-product/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.productBaseUrl}/get-products-count`)
      .pipe(map((objectValue: any) => objectValue.productsCount));
  }

  //
  getLoaclProduct(productId: string) {
    return this.products.find(product => product._id === productId);
  }
}
