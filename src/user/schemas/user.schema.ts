import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { UserRole } from '../dto/user-role.enum';

export type UserDocument = User & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class User {
  bcrypt = require('bcrypt');

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

  @Prop({
    // set: async function (v: any) {
    //   return await this.bcrypt.genSalt();
    // },
  })
  salt: string;

  @Prop({ type: S.Types.ObjectId, enum: UserRole })
  roleUserID: string;

  @Prop({ enum: UserRole })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
