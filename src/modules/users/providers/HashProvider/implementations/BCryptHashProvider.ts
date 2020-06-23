import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    // Compara uma senha não criptografada com uma já criptografada, para saber se é a mesma senha
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
