import { db } from "./modules/App/db"

let booted: boolean = false

export const bootstrap = async () => {
  if (booted) return;

  await db.initialize()
  
  booted = true;
}