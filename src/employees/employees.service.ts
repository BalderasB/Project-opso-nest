import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private  employees: CreateEmployeeDto[] = [
    {
    id: 1,
    name: "Alberto",
    lastname: "Castillo",
    phonenumber: "780-900-755"    
  },
  {
    id: 2,
    name: "Jose",
    lastname: "Jose",
    phonenumber: "234-345-696"
  }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=>employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate = {
      ...employeeToUpdate,
      ...updateEmployeeDto      
    }
    this.employees = this.employees.map((employee)=>{
      if (employee.id === id){
        employee = employeeToUpdate
      }
      return employeeToUpdate;
    })
    return employeeToUpdate;
  }

  remove(id: number) {
   this.employees = this.employees.filter((employee) => employee.id !== id);
   return this.employees;
  }
}
