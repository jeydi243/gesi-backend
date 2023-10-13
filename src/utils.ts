import { isInstance } from 'class-validator';
import { log } from 'console';
import { cwd } from 'process';
export default function buildLink(employeeID: string, file: Express.Multer.File, filename: string): string | null {
  try {
    const ext = file.mimetype.split('/')[1];
    const path = `${cwd()}\\STORAGES\\Employees\\${employeeID}\\files\\${filename}.${ext}`;
    return path;
  } catch (e: any) {
    if (isInstance(e, TypeError)) {
      log('Le type');
    }
    log(e);
    return null;
  }
}
