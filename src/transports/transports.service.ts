import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transport } from 'src/transports/transport.entity';
import { Repository } from 'typeorm';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';

@Injectable()
export class TransportsService {

    constructor(@InjectRepository(Transport) private transportRepository: Repository<Transport>){}

    async createTransport(transport: CreateTransportDto) {
        const transportFound = await this.transportRepository.findOne({
            where: {
                mark: transport.mark,
                is_used_now: transport.is_used_now
            }
        })

        if(transportFound){
            return new HttpException('Транспорт уже существует', HttpStatus.CONFLICT) 
        }

        const newTransport = this.transportRepository.create(transport)
        return this.transportRepository.save(newTransport)
    }

    getTransports(){
        return this.transportRepository.find()
    }

    async getTransport(id: number){
        const transportFound = await this.transportRepository.findOne({
            where: {
                id
            }
        })

        if(!transportFound){
            return new HttpException('Транспорт не найден', HttpStatus.NOT_FOUND)
        }

        return transportFound
    }

    async deleteTransport(id: number){
        const transportFound = await this.transportRepository.findOne({
            where: {
                id
            }
        });

        if(!transportFound){
            return new HttpException('Транспорт не найден', HttpStatus.NOT_FOUND)
        }

        return this.transportRepository.delete({id})
    }

    async updateTransport(id: number, driver: UpdateTransportDto){
        const transportFound = await this.transportRepository.findOne({
            where: {
                id
            }
        })

        if(!transportFound){
            return new HttpException('Транспорт не найден', HttpStatus.NOT_FOUND)
        }

        const updateTransport = Object.assign(transportFound, driver)
        return this.transportRepository.save(updateTransport)
    }
}
