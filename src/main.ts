import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Gizmo from './entity/Gizmo';
import Gadget from './entity/Gadget';

async function run() {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    database: 'ormtest',
    entities: [Gizmo, Gadget],
    synchronize: true,
    dropSchema: true,
    logging: true
  });

  const gizmo = new Gizmo();
  await gizmo.save();

  // This doesn't work
  const gadget = Gadget.create({
    gizmo: Promise.resolve(gizmo)
  });
  await gadget.save();

  // But this does
  // const gadget = new Gadget();
  // gadget.gizmo = Promise.resolve(gizmo);
  // await gadget.save();
}

run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
