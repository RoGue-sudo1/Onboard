import { Component } from '@angular/core';
import {products} from '../products'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
   products = [...products]

   share(){
    window.alert("The product has been shared")
   }

   OnNotify(){
    window.alert("You will bw notified when product goes on sale")
   }
}
