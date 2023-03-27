import { Model, Types as T } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as generatepass from 'password-generator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { TokenInterface } from './dto/token.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  // userModel: any = '22';
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwtService: JwtService) {}

  async register(userDto: CreateUserDto | any): Promise<string | null> {
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
        return this.jwtService.sign({ user }, { secret: process.env.JWT_SECRET });
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

  async login(loginuserDTO: LoginUserDto): Promise<TokenInterface & any> {
    const user: any = await this.userModel.findOne({ username: loginuserDTO.username }).exec();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'This user does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const hashedPassword = user.password;
    const plainTextPassword = loginuserDTO.password;
    // console.log({ hashedPassword }, { plainTextPassword }, { user });

    const isPassMatch: boolean = bcrypt.compareSync(plainTextPassword, hashedPassword);
    if (!isPassMatch) {
      console.log('Le mot de passe est incorrect: ', hashedPassword, plainTextPassword);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Vous avez entré un mauvais mot de passe',
        },
        HttpStatus.FORBIDDEN,
      );
      // return 'Le mot de passe est ne correspond 2';
    } else {
      console.log('Le mot de passe est correct');
      const tokenInterface: TokenInterface = {
        username: user.username,
        idOfUser: user.id,
        role: user.role,
        roleUserID: user.idOfRole,
      };
      const token: string = this.jwtService.sign(tokenInterface, { secret: process.env.JWT_SECRET });

      // return { token };
      return { user, token };
      setTimeout(() => {
        // return this.determinerRole(user.role, token, user.idOfRole);
      }, 3000);
    }
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
