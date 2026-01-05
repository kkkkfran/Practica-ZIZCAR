import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('records')
export class Record {
  // 1. ESTO ES LO QUE FALTABA: El ID numérico interno de la base de datos
  @PrimaryGeneratedColumn()
  id: number;

  // 2. Este es el ID que viene del PDF (ej: INV-001)
  @Column({ unique: true }) // Le ponemos unique para evitar duplicados
  sourceId: string;

  @Column({ type: 'date' })
  date: string; // TypeORM maneja las fechas como string 'YYYY-MM-DD' o Date object

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  description: string;
}