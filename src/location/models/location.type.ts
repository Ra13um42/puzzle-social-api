import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class location {
  @Prop()
  name: string;

  @Prop()
  display_name: string;

  @Prop()
  lat: string;

  @Prop()
  lon: string;

  @Prop()
  boundingbox: Array<string>;

  @Prop({ type: Object })
  geojson: any;

  @Prop()
  osm_id: number;

  @Prop()
  osm_type: string;
}
