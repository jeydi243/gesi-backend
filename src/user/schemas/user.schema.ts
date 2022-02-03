import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { UserRole } from 'src/export.type';
export type UserDocument = User & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class User {
  @Prop({
    required: true,
    minlength: 6,
    maxlength: 20,
    type: String,
    unique: true,
    set: (v: any) => {
      if (typeof v === 'string') {
        return v.toLowerCase();
      }
    },
  })
  username: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop({ type: S.Types.ObjectId, enum: UserRole })
  idOfRole: string;

  @Prop({ enum: UserRole })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
