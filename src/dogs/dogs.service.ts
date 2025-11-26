import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
  ) {}

  create(createDogDto: CreateDogDto): Promise<Dog> {
    const newDog = this.dogRepository.create(createDogDto);
    return this.dogRepository.save(newDog);
  }

  async findAll(breed?: string): Promise<Dog[]> {
    const dogs = await this.dogRepository.find({ where: { breed } });
    if (!dogs) {
      throw new NotFoundException('Dogs not found');
    }
    return dogs;
  }

  async findOne(id: number): Promise<Dog> {
    const dog = await this.dogRepository.findOne({ where: { id } });
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    return dog;
  }

  async update(id: number, updateDogDto: UpdateDogDto): Promise<Dog> {
    const dog = await this.findOne(id);
    Object.assign(dog, updateDogDto);
    return this.dogRepository.save(dog);
  }

  async remove(id: number): Promise<{ message: string }> {
    const dog = await this.findOne(id);
    await this.dogRepository.remove(dog);
    return { message: `Dog with ID ${id} has been removed` };
  }
}
