import { Test, TestingModule } from '@nestjs/testing';
import { CustomMealsService } from './custom_meals.service';

describe('CustomMealsService', () => {
  let service: CustomMealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomMealsService],
    }).compile();

    service = module.get<CustomMealsService>(CustomMealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
