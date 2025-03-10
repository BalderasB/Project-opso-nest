import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    return this.employeeRepository.find()
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
        employeeId: id,
        ...updateEmployeeDto
    });

    if (!employeeToUpdate) {
        throw new Error("Employee not found"); // Manejo de error si el empleado no existe
    }

    await this.employeeRepository.save(employeeToUpdate); // Agregado await para guardar correctamente

    return employeeToUpdate;
}


  remove(id: string) {
   this.employeeRepository.delete({
    employeeId: id
   })
   return{
    menssage: "Employee Borrado"
   }
  }
}
