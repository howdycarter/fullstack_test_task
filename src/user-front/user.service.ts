import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { writeFile, readFile, readFileSync } from 'fs';
import { UserUpdateDto } from './dto/user-update.dto';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
  constructor(private readonly mailService: MailService) {}

  async getAllUser() {
    const data = readFileSync('./data.json', 'binary');
    return JSON.parse(data) 
  }
  async findByName(req: any) {

    const data = readFileSync('./data.json', 'binary');
    const userList = await JSON.parse(data)

    const user = userList.filter(u => {

      let position = u.name.search(req.query.name);

      if ((position === 0) === true){
        return u
      }
    })

    return user

  }

  async findByEmail(req: any) {

    const data = readFileSync('./data.json', 'binary');
    const userList = await JSON.parse(data)

    return userList.filter(u => {

      let position = u.email.search(req.query.email);

      if ((position === 0) === true){
        return u
      }
    })
  }
  async getOneUser(id: number) {
    try {
      const data = readFileSync('./data.json', 'binary');
      const userList = await JSON.parse(data) 
      
      const user = userList.filter(u => u.id === id)
      
      return user
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async addUser(userUpdateDto: UserUpdateDto) {
    try {
      const { name, email, password } = userUpdateDto;

      const data = readFileSync('./data.json', 'binary');
      const userList = await JSON.parse(data) 
      const lastUser = userList[userList.length - 1]
      console.log(userList, lastUser);
      
      const newUser = {
        id : lastUser ? lastUser.id + 1 : 1,
        name,
        email,
        password
      }
      userList.push(newUser)

      writeFile(
        './data.json',
        JSON.stringify(userList),
          err => {
            if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
        }
      )
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editUser(id: number, userUpdateDto: UserUpdateDto) {
    try {
      const { name, email, password } = userUpdateDto;

      const data = readFileSync('./data.json', 'binary');
      const userList = await JSON.parse(data) 
  
      const idx = userList.findIndex(u => u.id === id)
      if (idx < 0) throw new NotFoundException()
  
      const updatedUser = {
        id,
        name,
        email,
        password
      }
      userList[idx] = updatedUser

      writeFile(
        './data.json',
        JSON.stringify(userList),
          err => {
            if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
        }
      )
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number) {
    try {

      const data = readFileSync('./data.json', 'binary');
      const userList = await JSON.parse(data) 
  
      const idx = userList.findIndex(u => u.id === id)
      if (idx < 0) throw new NotFoundException()
  
      userList.splice(idx, 1)

      writeFile(
        './data.json',
        JSON.stringify(userList),
          err => {
            if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
        }
      )
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sendUserMail(userId: number) {
    try {
      const data = readFileSync('./data.json', 'binary');
      const userList = await JSON.parse(data) 
      const user = userList.find(u => u.id === userId)
      if (user) {
        await this.mailService.sendMail(user.email, 'Test', 'Test');
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
