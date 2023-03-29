import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { UserRole } from 'src/config/export.type';

// export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    required: true,
    minlength: 4,
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

  @Prop({ type: S.Types.ObjectId, ref: 'Person' })
  idOfRole: string;

  @Prop({ type: [String] })
  roles: string[];

  @Prop({ type: Date, default: null })
  deleteAt: Date | null;
}

export const UserSchema: S = SchemaFactory.createForClass<User>(User);
