import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthorsModule} from './authors/authors.module';
import {BooksModule} from './books/books.module';
import mongooseConfig from './mongoose/mongoose.config';
import {MongooseService} from './mongoose/mongoose.service';
import {SeriesModule} from './series/series.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({req}) => ({req}),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongooseConfig)],
      useClass: MongooseService,
    }),
    BooksModule,
    AuthorsModule,
    SeriesModule,
  ],
})
export class AppModule {}
