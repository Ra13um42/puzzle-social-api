import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { pointSchema } from '../../location/models/point.schema';
import { location } from '../../location/models/location.type';
import { country } from '../../location/models/country.type';

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

  @Prop({ type: pointSchema, default: null })
  geometry: any;

  @Prop({ type: location, default: null })
  location: location;

  @Prop({ type: country, default: null })
  country: country;
}
export const UserSchema = SchemaFactory.createForClass(User);
