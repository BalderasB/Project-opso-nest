import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import e from "express";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column('text', {
        unique: true,
    })
    userEmail: string;
    @Column('text')
    userPassword: string;
    @Column('simple-array', {
        default: "Employee"
    })
    userRoles: string[];

    @OneToOne(() => Manager)
    manager: Manager;

    @OneToOne(() => Employee)
    employee: Employee;
}