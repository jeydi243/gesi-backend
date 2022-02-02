import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { exec } from 'child_process';

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
  testAbilities(role: string) {
    console.log('Bon apparement sa marche');
  }
  async register(userDto: CreateUserDto): Promise<User | null | Error> {
    const createdUser = new this.userModel(userDto);

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
      .catch(err => {
        console.log('Une erreur a été détectée : ' + err + '\n \n');
        return err;
      });
  }
  async deleteOne(idUser: string): Promise<(User & UserDocument) | null> {
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
      const hashedPassword = bcrypt.hashSync(updatePasswordDto.new_password, salt);
      await this.userModel.findOneAndUpdate({ _id: idUser }, { $set: { password: hashedPassword, salt } }).exec();
      return true;
    } catch (err) {
      console.log("Can't modify the password and new salt: " + err);
    }
  }
}
