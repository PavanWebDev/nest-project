import { Body, Controller, HttpStatus, Post, Put, Res, Get, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/service/user.service';


@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) { }
@Post('new')
   async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
  try {
    const newUser = await this.userService.createUser(createUserDto);
    return response.status(HttpStatus.CREATED).send({
    message: 'User has been created successfully',
    newUser,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).send({
    statusCode: 400,
    message: 'Error: User not created!',
    error: 'Bad Request'
 });
 }
}

@Get(':id')
   async getUser(@Res() response, @Param('id') userId: string) {
      try {
         const existingUser = await this.userService.getUser(userId);
         return response.status(HttpStatus.OK).send({
            message: 'User found Successfully', existingUser,
         });
      } catch (err) {
         return response.status(err.status).send(err.response)
      }
   }

@Get('all-users')
   async getAllUsers(@Res() response) {
      try {
         const usersData = await this.userService.getAllUsers();
         return response.status(HttpStatus.OK).send({
            message: 'User Data Found Successfully', usersData,
         });
      } catch (err) {
         return response.status(err.status).send(err.response)
      }
   }

@Put(':id')
   async updateUser(@Res() response, @Param('id') userId: string, @Body() data: object ) {
      try {
         const existingUser = await this.userService.updateUser(userId, data);
         return response.status(HttpStatus.OK).send({
            message: 'User updated Successfully', existingUser
         })
      } catch (err) {
         return response.status(err.status).send(err.response)
      }
   }

@Delete(':id')
   async deleteUser(@Res() response, @Param('id') userId: string) {
      try {
         const deletedUser =  await this.userService.deleteUser(userId)
         return response.status(HttpStatus.OK).send({
            message: 'User Deleted Successfully', deletedUser
         })
      } catch (err) {
         return response.status(err.status).send(err.response)
      }
   }
}