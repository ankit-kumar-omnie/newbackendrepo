import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class LabelValues {
  @Prop()
  id: string;

  @Prop()
  label: string;

  @Prop()
  values: string[];
}

@Schema({ timestamps: true })
export class forms {
  @Prop()
  id: string;

  @Prop()
  label: string;

  @Prop()
  formData: [
    {
      label: string;
      subQuestion: LabelValues[];
    }
  ];

  @Prop({ type: Object })
  uiSchema: any;

  @Prop({ type: Object })
  dataSchema: any;
}

export const SleepQuestionSchema = SchemaFactory.createForClass(forms);
