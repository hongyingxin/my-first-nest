import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

export interface Dog {
  id: string;
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class DogsService {
  private dogs: Dog[] = [
    {
      id: '1',
      name: '小白',
      age: 5,
      breed: '金毛',
    },
    {
      id: '2',
      name: '小黑',
      age: 3,
      breed: '拉布拉多',
    },
    {
      id: '3',
      name: '小黄',
      age: 2,
      breed: '柴犬',
    },
  ];

  create(createDogDto: CreateDogDto): Dog {
    const newDog: Dog = {
      id: (this.dogs.length + 1).toString(),
      ...createDogDto,
    } as Dog;
    this.dogs.push(newDog);
    return newDog;
  }

  findAll(breed?: string): Dog[] {
    if (breed) {
      return this.dogs.filter((dog) => dog.breed === breed);
    }
    return this.dogs;
  }

  findOne(id: string): Dog {
    const dog = this.dogs.find((dog) => dog.id === id);
    if (!dog) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return dog;
  }

  update(id: string, updateDogDto: UpdateDogDto): Dog {
    const dogIndex = this.dogs.findIndex((dog) => dog.id === id);
    if (dogIndex === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    this.dogs[dogIndex] = {
      ...this.dogs[dogIndex],
      ...updateDogDto,
    };
    return this.dogs[dogIndex];
  }

  remove(id: string): { message: string } {
    const dogIndex = this.dogs.findIndex((dog) => dog.id === id);
    if (dogIndex === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    this.dogs.splice(dogIndex, 1);
    return { message: `Dog with ID ${id} has been removed` };
  }
}
