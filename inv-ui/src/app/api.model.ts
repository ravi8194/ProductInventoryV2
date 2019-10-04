// tslint:disable-next-line: no-namespace
namespace AppModel {
  export interface Token {
    email: string;
    exp: number;
    iat: number;
    role: string;
    userId: string;
    userName: string;
  }

  export interface User {
    email: string;
    role: string;
    userId: string;
    password: string;
    userName: string;
  }

  export interface Product {
    _id: any;
    productName: string;
    price: number;
    rating: number;
    seller: string;
    status: string;
    isArchived: boolean;
    description: string;
    productImage: string;
    subcategory: any;
    category: any;
  }

  export interface Category {
    _id: any;
    category_name: string;
    parent_id: Array<string>;
  }
}
