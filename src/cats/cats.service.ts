import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ResourceNotFoundException } from '../exceptions';

export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Whiskers',
      age: 3,
      breed: 'Persian',
    },
    {
      id: 2,
      name: 'Fluffy',
      age: 2,
      breed: 'Maine Coon',
    },
    {
      id: 3,
      name: 'Shadow',
      age: 4,
      breed: 'Siamese',
    },
  ];

  findAll(breed?: string): Cat[] {
    if (breed) {
      return this.cats.filter((cat) => cat.breed === breed);
    }
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new ResourceNotFoundException('Cat', id);
    }
    return cat;
  }

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.cats.length + 1,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new ResourceNotFoundException('Cat', id);
    }

    this.cats[catIndex] = {
      ...this.cats[catIndex],
      ...updateCatDto,
    };

    return this.cats[catIndex];
  }

  remove(id: number): { message: string } {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new ResourceNotFoundException('Cat', id);
    }

    this.cats.splice(catIndex, 1);
    return { message: `Cat with ID ${id} has been removed` };
  }
}
