import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    // Compara uma senha não criptografada com uma já criptografada, para saber se é a mesma senha
    return payload === hashed;
  }
}

export default FakeHashProvider;
