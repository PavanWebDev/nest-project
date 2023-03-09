import { Injectable, NotFoundException } from '@nestjs/common';
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
  await this.userModel.updateOne({_id: userId}, {$set: {...data}});
   return 'User updated successfully';
}
async getAllUsers(): Promise<NewUser[]> {
    const usersData = await this.userModel.find({});
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
async deleteUser(userId: string): Promise<NewUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
   if (!deletedUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return deletedUser;
}
}