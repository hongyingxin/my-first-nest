import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
    catsService = app.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const result = catsController.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter cats by breed', () => {
      const result = catsController.findAll('Persian');
      expect(result.every(cat => cat.breed === 'Persian')).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', () => {
      const result = catsController.findOne('1');
      expect(result.id).toBe('1');
      expect(result.name).toBe('Whiskers');
    });
  });

  describe('create', () => {
    it('should create a new cat', () => {
      const createCatDto = {
        name: 'New Cat',
        age: 2,
        breed: 'Tabby',
      };
      const result = catsController.create(createCatDto);
      expect(result.name).toBe('New Cat');
      expect(result.age).toBe(2);
      expect(result.breed).toBe('Tabby');
    });
  });
}); 