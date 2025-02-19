import { Style } from "./style.model";
import { Variety } from "./variety.model";

interface Position{
    latitude:number,
    longitude:number
}

export interface Wine{
    _id:string,
    name:string,
    year :number,
    imageCover:string,
    images:string[],
    price:number,
    quantityState:number,
    styles:Style[],
    varieties:Variety,
    expo:Position[],
    description:string,
    volume:string,
    origin:string,
    alcohol:string

} 