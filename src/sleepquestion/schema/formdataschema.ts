import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class formData {
  @Prop()
  id: string;

  @Prop({ type: Object })
  data: any;
}

export const FormDataSchema = SchemaFactory.createForClass(formData);
