import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { UserSchema } from './schema/user.schema';




@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://pavanca97:******************.z8***c2.mongodb.net/test'), MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), PassportModule, JwtModule.register({
    secret: 'TOP_SECRET',
    signOptions: {expiresIn: "1h"}
  })],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassportModule]
})
export class AppModule {}
