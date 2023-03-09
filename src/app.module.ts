import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './schema/user.schema';



@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://pavanca97:la0xi8Q2NySPvXSF@cluster0.zbvv4c2.mongodb.net/test'), MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
