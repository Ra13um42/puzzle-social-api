import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { pointSchema } from '../../location/models/point.schema';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  about: string;

  @Prop()
  telegram: string;

  @Prop()
  channel: string;

  @Prop()
  created: Date;

  @Prop()
  lastLogin: Date;

  @Prop()
  anonym: Boolean;

  @Prop()
  eventsKey: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
