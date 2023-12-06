import { Test, TestingModule } from '@nestjs/testing';
import { CustomMealsController } from './custom_meals.controller';
import { CustomMealsService } from './custom_meals.service';

describe('CustomMealsController', () => {
  let controller: CustomMealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomMealsController],
      providers: [CustomMealsService],
    }).compile();

    controller = module.get<CustomMealsController>(CustomMealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
