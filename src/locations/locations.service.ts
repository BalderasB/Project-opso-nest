import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const location = plainToInstance(Location, createLocationDto);
    return await this.locationRepository.save(location);
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return await this.locationRepository.save(location);
  }

  async remove(id: number) {
    const location = await this.findOne(id);
    return await this.locationRepository.remove(location);
  }
}
