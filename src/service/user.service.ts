import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Model } from "mongoose";
import { NewUser } from 'src/Interface/user.intrface';

@Injectable()
export class UserService {
constructor(@InjectModel('User') private userModel:Model<NewUser>) { }
async createUser(createUserDto: CreateUserDto): Promise<NewUser> {
   const newUser = await new this.userModel(createUserDto);
   return newUser.save();
}
async updateUser(userId: string, data: object): Promise<string> {
   const existingUser = await this.userModel.findById(userId)
   if (!existingUser) {
      throw new NotFoundException('This user did not exist');
   }
  await this.userModel.updateOne({_id: userId}, {$set: {...data}});
  return 'User updated successfully';
}
async getAllUsers(): Promise<NewUser[]> {
    const usersData = await this.userModel.find({age: {$gt: 21}}, { __v: 0, _id: 1, email: 0});
    if (!usersData || usersData.length == 0) {
        throw new NotFoundException('Users data not found!');
    }
    return usersData;
}
async getUser(userId: string): Promise<NewUser> {
   const existingUser = await this.userModel.findById(userId).exec();
   if (!existingUser) {
    throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}
async findUser(userName: string): Promise<any> {
const authUser = await this.userModel.findOne({name: userName})
if (!authUser) {
   throw new UnauthorizedException('The credentials are not matching')
}
return authUser
}
async deleteUser(userId: string): Promise<NewUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
   if (!deletedUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return deletedUser;
}
}