---
name: plan-feature
description: Planifica una nueva funcionalidad antes de tocar código
argument-hint: [descripción de la funcionalidad]
disable-model-invocation: true
context: fork
agent: Plan
---
Quiero añadir esta funcionalidad: $ARGUMENTS

Antes de escribir código, prepárame un plan con:
1. Cómo la vas a implementar, respetando las reglas de AGENTS.md.
2. Qué archivos vas a modificar y qué cambia en cada uno.
3. Los casos límite y las dudas que debo decidir yo antes de empezar.
4. Qué actualizarías en AGENTS.md y en MEMORY.md.

Antes de planificar, lee AGENTS.md y MEMORY.md para conocer las reglas y el estado actual del proyecto.

No modifiques ningún archivo.