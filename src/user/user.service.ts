import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    if (await this.findByMail(userDto.email)) {
      throw new BadRequestException('Email bereits registriert');
    }

    let newUser = new this.userModel({
      ...userDto,
      password: await bcrypt.hash(userDto.password, 8),
      location: null,
      created: Date(),
      lastLogin: Date(),
      anonym: false,
    });

    newUser = await newUser.save();
    newUser.password = undefined;
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public findByMail(email: string, addPassword = false): Promise<User> {
    let query = this.userModel.findOne({ email });

    if (addPassword) {
      query = query.select('+password');
    }

    return query.exec();
  }

  public findById(userId: string): Promise<User> {
    const query = this.userModel.findOne({ _id: userId });
    return query.exec();
  }

  public findByEventsKey(eventsKey: string): Promise<User> {
    const query = this.userModel.findOne({ eventsKey: eventsKey });
    return query.exec();
  }

  // public checkAndEventKey(userId: string): Promise<User> {
  //   const ekey = uuidv4();
  //   const uupdate = { eventsKey: ekey.toString() };
  //   const query = this.userModel.findOneAndUpdate({ _id: userId }, uupdate, {
  //     upsert: true,
  //     new: true
  //   });

  //   return query.exec();
  // }

  // public async setLocation(userId, locationId) {
  //   const location = await this.locationService.findById(locationId);

  //   const query = { _id: userId };
  //   const update = {
  //     location: location.geometry,
  //     locationId: location.id,
  //     locationLabel: location.address.label,
  //   };

  //   return this.userModel.updateOne(query, update).exec();
  // }

  public async setName(userId, name) {
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: name,
        },
      },
    );
  }

  public async setAbout(userId, text) {
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          about: text,
        },
      },
    );
  }

  
  public async setMyWorld(userId, value) {
    const query = { _id: userId };
    const update = {
      myWorld: value,
    };
    return await this.userModel.updateOne(query, update).exec();
  }

  public async setPhoto(userId, fileName) {
    return await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          photo: fileName,
        },
      },
    );
  }

//   public async findNear(locationId) {
//     if (!locationId) {
//       return this.findAll();
//     }

//     const location = await this.locationService.findById(locationId);

//     if (!location) {
//       return this.findAll();
//     }

//     const result = await this.userModel
//       .aggregate([
//         {
//           $geoNear: {
//             near: location.geometry,
//             //maxDistance: 112000,
//             distanceField: 'distance',
//             spherical: false,
//             key: 'location',
//           },
//         },
//       ])
//       .project({ password: false })
//       .limit(20)
//       .exec();
//     return result;
//   }

}
