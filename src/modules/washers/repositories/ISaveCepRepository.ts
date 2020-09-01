import SaveCepSearch from '../infra/typeorm/entities/SaveCepSearch';

import ICreateSaveCepDTO from '../dtos/ICreateSaveCepDTO';

export default interface ISaveCepRepository {
  create(data: ICreateSaveCepDTO): Promise<SaveCepSearch>;
}
