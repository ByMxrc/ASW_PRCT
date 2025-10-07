import { Usuario } from "../domain/usuario.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class UsuarioService {
  private repo: Repository<Usuario>;
  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }
  async create(data: Partial<Usuario>) { return this.repo.save(data); }
  async findAll() { return this.repo.find(); }
  async findOne(id: number) { return this.repo.findOne({ where: { id } }); }
  async findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
  async update(id: number, data: Partial<Usuario>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }
  async remove(id: number) { return this.repo.delete(id); }
}
