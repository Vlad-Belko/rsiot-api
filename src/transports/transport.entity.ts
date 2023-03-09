import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Transport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mark: string;

    @Column()
    city: string;

    @Column()
    is_used_now: boolean;
}