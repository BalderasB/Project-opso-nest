import { Entity, Column, PrimaryGeneratedColumn, IsNull } from "typeorm";

@Entity()
export class Product {     
    @PrimaryGeneratedColumn('uuid')
    productId: string;  
    @Column('text')     
    productName: string;   
    @Column('float')     
    price: number;    
    @Column('int') 
    countSeal: number;  
     //@Column({type: 'uuid'})   
         
    // provider: string;
}
