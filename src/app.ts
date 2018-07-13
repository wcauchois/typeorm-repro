import 'reflect-metadata';
import { createConnection, Entity, Column, BaseEntity, PrimaryGeneratedColumn, Between } from 'typeorm';

@Entity()
class Thing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    transformer: {
      from(value) {
        console.log('from', value);
        return value;
      },

      to(value) {
        console.log('to', value);
        return value;
      }
    }
  })
  field: number;
} 

async function run() {
  await createConnection({
    type: 'sqlite',
    database: './db.sqlite',
    entities: [Thing],
    synchronize: true,
    dropSchema: true
  });

  for (let i = 0; i < 5; i++) {
    const thing = new Thing();
    thing.field = i;
    await thing.save();
  }

  const result = await Thing.find({ where: { field: Between(2, 3) } });
  console.log(result);
}

run();
