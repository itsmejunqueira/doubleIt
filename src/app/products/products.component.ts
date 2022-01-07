import { DeleteComponent } from './pages/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [
    { id:1,
      photo: "../../assets/MacBook_Pro_16.png",
      name: "MacBook Pro 2021 16'",
      description: "MacBook Pro com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 17.499,00",
      tags: ["Apple", "MacBook"]
    },
    {id:2,
      photo: "../../assets/MacBook_ Air_256.jpg",
      name: "MacBook Air 256GB 2020",
      description: "MacBook Air com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 10.499,00",
      tags: ["Apple", "MacBook"]
    },
    {id:3,
      photo: "../../assets/MacBook_ Air_512.jpg",
      name: "MacBook Air 512 GB 2021",
      description: "MacBook Air com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 13.499,00",
      tags: ["Apple", "MacBook"]
    },
    {id:4,
      photo: "../../assets/MacBook_Pro_2019.jpg",
      name: "MacBook Pro 2019 16'",
      description: "MacBook Pro com a melhor tecnologia do mercado, trazendo muita inovação e velocidade.",
      price: "R$ 12.499,00",
      tags: ["Apple", "MacBook"]
    },
  ]
  constructor(
    public dialog: MatDialog) { }

  newProduct() {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.products.push(result);
      }
    });
  }
 
  editProduct(item) {
    const dialogRef = this.dialog.open(EditComponent , {
      data: item,
    }) ;

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        const index = this.products.indexOf(item);
        this.products[index]=result;
      }
    });
  }

  deleteProduct(item) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true) {
        const index = this.products.indexOf(item);
        this.products.splice(index, 1);
      }
    });
  }


  ngOnInit(): void {
  }

}
