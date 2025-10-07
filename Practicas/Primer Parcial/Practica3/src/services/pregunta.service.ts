import { Pregunta } from "../domain/pregunta.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class PreguntaService {
  private repo: Repository<Pregunta>;
  constructor() {
    this.repo = AppDataSource.getRepository(Pregunta);
  }
  async create(data: Partial<Pregunta>) { return this.repo.save(data); }
  async findAll() { return this.repo.find(); }
  async findOne(id: number) { return this.repo.findOne({ where: { id } }); }
  async update(id: number, data: Partial<Pregunta>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }
  async remove(id: number) { return this.repo.delete(id); }
}
