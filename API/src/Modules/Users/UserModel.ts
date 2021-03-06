// API/src/Modules/Users/UserModel.ts
import { ObjectType, Field, ID, ArgumentValidationError } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './UserRole';
import {
  validatePassword,
  generateToken,
  hashPassword,
} from '../Auth/AuthController';
import { Validate } from 'class-validator';
import {
  UniqueUsernameConstraint,
  UniqueEmailConstraint,
} from '../Auth/AuthValidator';
import { Project } from '../Projects/ProjectModel';
import { Idea } from '../Ideas/IdeasModel';
import { UserDefaults } from './UserDefaultsModel';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar')
  @Validate(UniqueUsernameConstraint)
  username: string;

  @Column('varchar')
  @Validate(UniqueEmailConstraint)
  email: string;

  @Column({
    array: true,
    enum: UserRole,
    type: 'enum',
    default: [UserRole.USER],
  })
  roles: UserRole[];

  @Column('text')
  hashedPassword: string;

  async generateToken(plainText: string): Promise<string> {
    const valid = await validatePassword(plainText, this.hashedPassword);
    if (!valid)
      throw new ArgumentValidationError([
        {
          property: 'password',
          constraints: {
            isValid: 'Password is invalid',
          },
          children: [],
        },
      ]);
    return generateToken(this);
  }

  async setPassword(plainText: string): Promise<void> {
    this.hashedPassword = await hashPassword(plainText);
  }

  get projects(): Promise<Project[]> {
    return Project.getUserProjects(this);
  }

  get ideas(): Promise<Idea[]> {
    return Idea.find({ userId: this.id });
  }

  get userDefaults(): Promise<UserDefaults | undefined> {
    return UserDefaults.findOne({ where: { userId: this.id } });
  }
}
