import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

  constructor() { }

  public getAllproducts(){
  return [
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
  ] }

}