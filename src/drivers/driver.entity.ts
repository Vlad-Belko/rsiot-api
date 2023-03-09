import { Transport } from 'src/transports/transport.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({nullable: true})
    transport_id: number;

    @OneToOne(() => Transport)
    @JoinColumn()
    transport: Transport
}