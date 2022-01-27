import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import generator from 'generate-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<(User & UserDocument) | null> {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }
  logout(userDto: CreateUserDto): boolean {
    return false;
  }
  async register(userDto: CreateUserDto): Promise<User | null | Error> {
    const createdUser = new this.userModel(userDto);
    createdUser.password = generator.generate({
      length: 10,
      numbers: true,
    });

    return bcrypt
      .genSalt()
      .then((salt: string) => {
        createdUser.salt = salt;
        console.log('Salt created for user: ' + salt);
        return bcrypt.hash(userDto.password, createdUser.salt);
      })
      .then((hashedPassword: string) => {
        createdUser.password = hashedPassword;
        console.log('hashedPassword created is : ' + hashedPassword);
        return createdUser.save();
      })

      .then((user: User & UserDocument) => {
        console.log('New user created with id: ', user._id);
        return user;
      })
      .catch((err) => {
        console.log('Une erreur a été détectée : ' + err + '\n \n');
        return err.message;
      });
  }
  async deleteOne(idUser: string): Promise<(User & UserDocument) | null> {
    return this.userModel
      .findOneAndUpdate({ _id: idUser }, { deleteAt: Date.now() })
      .exec();
  }
  removeBy(idUser: string, updateUserDto: UpdateUserDto) {
    return `This action removes a #${idUser} user`;
  }
  async findAll(): Promise<User[] | any> {
    return this.userModel
      .find()
      .select('-password -salt') // select all except password and salt
      .then(function (users: User[]) {
        return users;
      })
      .catch(function (err: Error) {
        console.log('Une erreur est survenue', err);
        return err.message;
      });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
