export interface PInterface {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating: ratingProps;
}
 interface ratingProps {
    rate:number;
    count:number;
 }