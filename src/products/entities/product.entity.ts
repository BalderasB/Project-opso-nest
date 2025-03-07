import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, IsNull, ManyToOne } from "typeorm";

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
    @ManyToOne(()=> Provider,(provider)=> provider.products      
    )
    provider: Provider
}
