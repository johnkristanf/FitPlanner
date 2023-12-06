import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomMealDto } from './create-custom_meal.dto';

export class UpdateCustomMealDto extends PartialType(CreateCustomMealDto) {}
