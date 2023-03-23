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
      name: 'Jocky Men Underwear 2',
      label: '',
      richDescription: '',
      description: 'Nice underwear',
      image: 'assets/images/demos/demo2/products/1.jpg',
      images: ['assets/images/demos/demo2/products/2.jpg', 'assets/images/demos/demo2/products/3.jpg'],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
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
      image: 'assets/images/demos/demo2/products/2.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 10,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p3',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      image: 'assets/images/demos/demo2/products/3.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 20,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p4',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      image: 'assets/images/demos/demo2/products/4.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p5',
      name: 'Jocky Men Underwear',
      label: 'new',
      richDescription: '',
      description: '',
      image: 'assets/images/demos/demo2/products/5.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 30,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p6',
      name: 'Jocky Men Underwear',
      label: 'new',
      richDescription: '',
      description: '',
      image: 'assets/images/demos/demo2/products/6.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p7',
      name: 'Jocky Men Underwear',
      label: '',
      richDescription: '',
      description: '',
      image: 'assets/images/demos/demo2/products/7.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 21,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
    {
      _id: 'p8',
      name: 'Jocky Men Underwear',
      label: 'new',
      richDescription: '',
      description: '',
      image: 'assets/images/demos/demo2/products/8.jpg',
      images: [],
      colors: ['Black', 'Blue', 'Green'],
      weight: '',
      washIntructions: ['Normal Wash At 40c', 'Do not dry clean', 'Do not bleach', 'Line dry in shade'],
      sizes: ['Extra Large', 'Large', 'Medium'],
      features: ['Fabric Details : Cotton', 'Made from Super Combed Cotton rib fabric', 'USA Originals back panel placement print', 'Square shape neckline with contrast binding and piping', 'To be worn as loungewear, innerwear and sportswear- for all purpose use'],
      brand: 'Jocky',
      quantity: 1,
      mrpPrice: 89,
      currentPrice: 99,
      currency: 'USD',
      categories: [''],
      countInStock: 10,
      rating: 4,
      numReviews: 40,
      isFeatured: false,
      category: {
        _id: 'c1',
        name: 'innerwear',
        icon: 'cloths',
        image: 'assets/img/collection/collection10.webp',
        checked: false
      },
      reviews: []
    },
  ];

  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: string, productsIds?: string[], searchStr?: string, extraFilters?: any): Observable<ProductsResponse> {
    // let params = new HttpParams();
    if (categoriesFilter) {
      const filter = JSON.stringify(categoriesFilter);
      // params = params.append('categories', categoriesFilter.join(','))
      // or below approach //
      return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products?categories=${filter}`);
    }
    if (extraFilters) {
      // params = params.append('categories', categoriesFilter.join(','))
      // or below approach //
      return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products?sizes=${extraFilters}`);
    }
    if (productsIds) {
      return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products?productsIds=${productsIds}`);
    }
    if (searchStr) {
      return this.http.get<ProductsResponse>(`${this.productBaseUrl}/get-products?search=${searchStr}`);
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

  // local products // just for testing
  getLocalProduct(productId: string) {
    return this.products.find(product => product._id === productId);
  }
}
