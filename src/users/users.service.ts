import { Model, Types as T } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as generatepass from 'password-generator';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async register(userDto: CreateUserDto | any): Promise<User | null | Error> {
    const createdUser = new this.userModel(userDto);
    createdUser.password = generatepass(12, true, null, `${userDto.__t}`);
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

      .then((user: User) => {
        console.log('New user created with id: ', user._id);
        return user;
      })
      .catch(err => {
        console.log('Une erreur a été détectée : ' + err + '\n \n');
        return err;
      });
  }
  async registerRoot(userDto: CreateUserDto): Promise<User | any> {
    const createdUser = new this.userModel(userDto);

    return bcrypt
      .genSalt()
      .then((salt: string) => {
        console.log('Salt created for root: ' + salt);
        createdUser.salt = salt;
        return bcrypt.hash(userDto.password, createdUser.salt);
      })
      .then((hashedPassword: string) => {
        createdUser.password = hashedPassword;
        createdUser.idOfRole = new T.ObjectId().toString();
        console.log('hashedPassword created is : ' + hashedPassword);
        return createdUser.save();
      })
      .then((user: User) => {
        console.log('Root user id: ', user._id);
        return user;
      })
      .catch(err => {
        console.log('Une erreur a été détectée : ' + err + '\n \n');
        return err;
      });
  }
  async findOne(username: string): Promise<User | null> {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }
  async logout(): Promise<boolean> {
    return false;
  }
  async deleteOne(idUser: string): Promise<User | null> {
    return this.userModel.findOneAndUpdate({ _id: idUser }, { $set: { deleteAt: Date.now() } }).exec();
  }
  async findAll(): Promise<User[] | any> {
    return this.userModel
      .find()
      .select(' -salt') // select all except password and salt
      .then(function (users: User[]) {
        if (users.length === 0) {
          return { message: 'No users found', users };
        }
        return users;
      })
      .catch(function (err: Error) {
        console.log('Une erreur est survenue', err);
        return err.message;
      });
  }
  removeBy(idUser: string, updateUserDto: UpdateUserDto) {
    return `This action removes a #${idUser} user`;
  }
  async updatePassword(idUser: number, updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    try {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(updatePasswordDto.newPassword, salt);
      await this.userModel.findOneAndUpdate({ _id: idUser }, { $set: { password: hashedPassword, salt } }).exec();
      return true;
    } catch (err) {
      console.log("Can't modify the password and new salt: " + err);
    }
  }
}
