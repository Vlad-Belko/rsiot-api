import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Transport } from './transport.entity';
import { TransportsService } from './transports.service';

@Controller('transports')
export class TransportsController {

    constructor(private transportsService: TransportsService) {}

    @Get()
    getTransports(): Promise<Transport[]>{
        return this.transportsService.getTransports();
    }

    @Get(':id')
    getTransport(@Param('id', ParseIntPipe) id: number){
        return this.transportsService.getTransport(id);
    }

    @Post()
    createTransport(@Body() newTransport: CreateTransportDto){
        return this.transportsService.createTransport(newTransport)
    }

    @Delete(':id')
    deleteTransport(@Param('id', ParseIntPipe) id: number){
        return this.transportsService.deleteTransport(id)
    }

    @Patch(':id')
    updateTransport(@Param('id') id: number, @Body()
    transport: UpdateTransportDto) {
        return this.transportsService.updateTransport(id, transport)
    }

}
