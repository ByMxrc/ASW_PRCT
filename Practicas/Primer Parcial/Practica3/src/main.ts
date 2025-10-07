import { AppDataSource } from "./data-source";
import { CursoService } from "./services/curso.service";
import { ActividadService } from "./services/actividad.service";
import { EvaluacionService } from "./services/evaluacion.service";
import { EvaluacionPreguntaService } from "./services/evaluacion-pregunta.service";

async function main() {
  await AppDataSource.initialize();

  const cursoService = new CursoService();
  const actividadService = new ActividadService();
  const evaluacionService = new EvaluacionService();
  const evaluacionPreguntaService = new EvaluacionPreguntaService();

  // Seed: Crear un Curso
  const curso = await cursoService.create({
    titulo: "Programación Web",
    descripcion: "Curso de Node.js y TypeORM",
    profesorId: 1,
  });
  console.log("Curso creado:", curso);

  // Seed: Crear una Actividad asociada al Curso
  const actividad = await actividadService.create({
    cursoId: curso.id,
    titulo: "Taller TypeORM",
    descripcion: "Modelar entidades y servicios"
  });
  console.log("Actividad creada:", actividad);

  // Seed: Crear una Evaluación asociada al Curso
  const evaluacion = await evaluacionService.create({
    cursoId: curso.id,
    puntajeRequerido: 16.5
  });
  console.log("Evaluación creada:", evaluacion);

  // Seed: Crear una EvaluacionPregunta asociada a la Evaluación
  const pregunta = await evaluacionPreguntaService.create({
    evaluacionId: evaluacion.id,
    preguntaId: 1 // Supón que existe una pregunta con id 1
  });
  console.log("EvaluaciónPregunta creada:", pregunta);

  // Probar findAll de cada servicio
  console.log("Cursos:", await cursoService.findAll());
  console.log("Actividades:", await actividadService.findAll());
  console.log("Evaluaciones:", await evaluacionService.findAll());
  console.log("EvaluacionPreguntas:", await evaluacionPreguntaService.findAll());

  // Probar update y remove
  await cursoService.update(curso.id, { titulo: "Programación Web Avanzada" });
  console.log("Curso actualizado:", await cursoService.findOne(curso.id));

  await actividadService.remove(actividad.id);
  console.log("Actividades tras borrar una:", await actividadService.findAll());

  // Finalizar la conexión
  await AppDataSource.destroy();
}

main().catch(console.error);