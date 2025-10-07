import { Profesor } from "../domain/profesor.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class ProfesorService {
  private repo: Repository<Profesor>;
  constructor() {
    this.repo = AppDataSource.getRepository(Profesor);
  }
  async create(data: Partial<Profesor>) { return this.repo.save(data); }
  async findAll() { return this.repo.find(); }
  async findOne(id: number) { return this.repo.findOne({ where: { id } }); }
  async findByEstado(estado: string) { return this.repo.find({ where: { estado } }); }
  async update(id: number, data: Partial<Profesor>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }
  async remove(id: number) { return this.repo.delete(id); }
}
