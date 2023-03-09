import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { Driver } from './driver.entity';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriversController {

    constructor(private driversService: DriversService) {}

    @Get()
    getDrivers(): Promise<Driver[]>{
        return this.driversService.getDrivers();
    }

    @Get(':id')
    getDriver(@Param('id', ParseIntPipe) id: number){
        return this.driversService.getDriver(id);
    }

    @Post()
    createDriver(@Body() newDriver: CreateDriverDto){
        return this.driversService.createDriver(newDriver)
    }

    @Delete(':id')
    deleteDriver(@Param('id', ParseIntPipe) id: number){
        return this.driversService.deleteDriver(id)
    }

    @Patch(':id')
    updateDriver(@Param('id') id: number, @Body()
    driver: UpdateDriverDto) {
        return this.driversService.updateDriver(id, driver)
    }
}
