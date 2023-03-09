import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {

    constructor(
        @InjectRepository(Driver) private driverRepository: Repository<Driver>){}

    async createDriver(driver: CreateDriverDto){
        const driverFound = await this.driverRepository.findOne({
            where: {
                name: driver.name,
                surname: driver.surname
            }
        })

        if(driverFound){
            return new HttpException('Водитель уже существует', HttpStatus.CONFLICT) 
        }

        const newDriver = this.driverRepository.create(driver)
        return this.driverRepository.save(newDriver)
    }

    getDrivers(){
        return this.driverRepository.find()
    }

    async getDriver(id: number){
        const driverFound = await this.driverRepository.findOne({
            where: {
                id
            }
        })

        if(!driverFound){
            return new HttpException('Водитель не найден', HttpStatus.NOT_FOUND)
        }

        return driverFound
    }

    async deleteDriver(id: number){
        const driverFound = await this.driverRepository.findOne({
            where: {
                id
            }
        });

        if(!driverFound){
            return new HttpException('Водитель не найден', HttpStatus.NOT_FOUND)
        }

        return this.driverRepository.delete({id})
    }

    async updateDriver(id: number, driver: UpdateDriverDto){
        const driverFound = await this.driverRepository.findOne({
            where: {
                id
            }
        })

        if(!driverFound){
            return new HttpException('Водитель не найден', HttpStatus.NOT_FOUND)
        }

        const updateDriver = Object.assign(driverFound, driver)
        return this.driverRepository.save(updateDriver)
    }

}
