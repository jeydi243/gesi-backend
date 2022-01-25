import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  generator = require('generate-password');
  bcrypt = require('bcrypt');
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(userDto: CreateUserDto): Promise<User | null> {
    return;
  }
  logout(userDto: CreateUserDto): boolean {
    return false;
  }
  async register(userDto: CreateUserDto): Promise<User | null> {
    const createdUser = new this.userModel(userDto);
    createdUser.password = this.generator.generate({
      length: 10,
      numbers: true,
    });

    return this.bcrypt
      .genSalt()
      .then((salt: string) => {
        createdUser.salt = salt;
        console.log('Salt created for user: ' + salt);
        return this.bcrypt.hash(userDto.password, createdUser.salt);
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
  remove(idUser: string) {
    return `This action removes a #${idUser} user`;
  }
  removeBy(idUseg: string, updateUserDto: UpdateUserDto) {
    return `This action removes a #${idUseg} user`;
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
