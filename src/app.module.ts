import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { RolModule } from './rol/rol.module';
import { PermisoModule } from './permiso/permiso.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { InsumoModule } from './insumo/insumo.module';
import "dotenv/config.js"; 
@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:`.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
     imports:[ConfigModule],
     useFactory:(configService: ConfigService)=>({
      type:'postgres',
      host:configService.get('DB_HOST'),
      port:configService.get('DB_PORT'),
      username:configService.get('DB_USER'),
      password:configService.get('DB_PASSWORD'),
      database:configService.get('DB_NAME'),
      autoLoadEntities:true
     }),
     inject:[ConfigService],
    }),
    UsersModule,
    RolModule,
    PermisoModule,
    AuthModule,
    InsumoModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
