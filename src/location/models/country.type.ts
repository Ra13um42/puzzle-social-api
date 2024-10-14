import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class country {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  native: string;
}
