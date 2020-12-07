import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Author} from './schema/author.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<Author>,
  ) {}

  id(author: Author): string {
    return author._id;
  }

  async getById(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id);

    if (author) return author;

    throw new Error(`Author associated with ID "${id}" doesn't exist.`);
  }

  async create(data: {name: string}): Promise<Author> {
    return this.authorModel.create({...data});
  }
}
