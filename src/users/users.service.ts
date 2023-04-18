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

  async register(userDto: CreateUserDto | any): Promise<Record<string, unknown> | null> {
    try {
      const createdUser = new this.userModel(userDto);
      createdUser.password = generatepass(12, true, null, `${userDto.__t}`);
      createdUser.salt = await bcrypt.genSalt();
      const hashedPassword: string = await bcrypt.hash(userDto.password, createdUser.salt);
      createdUser.password = hashedPassword;
      createdUser.save();
      // const user = this.userModel.findOne({ username: userDto.username });
      return { username: userDto.username, password: createdUser.password };
      // return this.jwtService.sign({ user }, { secret: process.env.JWT_SECRET });
    } catch (error) {
      console.log('Une erreur a été détectée : ' + error + '\n \n');
      return error;
    }
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
        user_id: user.id,
        roles: user.roles,
        role_id: user.idOfRole,
      };
      const token: string = this.jwtService.sign(tokenInterface, { secret: process.env.JWT_SECRET });

      // return { token };
      return token; //{ ...user, token };
    }
  }
  async findOne(username: string): Promise<User | null> {
    return this.userModel
      .findOne({
        username,
      })
      .select(' -salt')
      .exec();
  }
  async logout(): Promise<boolean> {
    return false;
  }
  async deleteOneById(idUser: string): Promise<any | null> {
    console.log('Lol', idUser);

    return await this.userModel.findByIdAndUpdate(idUser, { $set: { deleteAt: Date.now() } }, { new: true }).exec();
  }
  async deleteManyById(ids: string[]): Promise<any | null> {
    return this.userModel.updateMany({ _id: { $in: ids } }, { $set: { deleteAt: Date.now() } }).exec();
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
  removeBy(updatedUserDto: UpdateUserDto) {
    return this.userModel.remove(updatedUserDto).exec();
    // return `This action removes user #${{id}} `;
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
