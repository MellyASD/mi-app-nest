import { PartialType } from '@nestjs/mapped-types'; // PartialType is used to create a type with all properties of CreateItemDto set to optional
import { CreateItemDto } from './create-item.dto'; // Import CreateItemDto to extend it

// UpdateItemDto extends CreateItemDto, making all its properties optional

export class UpdateItemDto extends PartialType(CreateItemDto) {}
