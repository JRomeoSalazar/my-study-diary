# Spec-Driven Development

## Flujo de desarrollo con SDD
Especificación -> Planificación -> Implementación -> Validación -> Despliegue / Mantenimiento

## Taxonomía SDD
- **Spec-First**: escribes la especificación, generas el código una vez, y a partir de ahí editas el código directamente. La especificación fue el punto de partida y muere.
- **Spec-anchored**: la spec se mantiene viva: conservas y actualizas la especificación para guiar la evolución del código. Es el más recomendable para empezar.
- **Spec-as-source**: editas únicamente la especificación y el código se genera a partir de ella y no se modifica manualmente.

## EARS (Easy Approach to Requirements Syntax)
EARS: es una forma de escribir requisitos con plantillas fijas para que no sean ambiguos.
Por qué funciona tan bien con IA:
- Cada requisito se puede verificar, así que se convierte casi directamente en un test.
- El SI… ENTONCES obliga a pensar en los errores, que es justo lo que la IA suele olvidar.
- Una frase = un comportamiento. Nada de párrafos donde el agente tenga que interpretar.

## Estructura SDD
```text
project/
├── .opencode/
├── .agents/
├── AGENTS.md
├── MEMORY.md
├── docs/
│   └── constitution.md
├── specs/
│   ├── 001-nombre-spec/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   ├── 002-nombre-spec/
│   │   └── ...
│   └── 003-nombre-spec/
│       └── ...
├── tests/
└── <CÓDIGO DEL PROYECTO>
```

## SDD paso a paso
- **Paso 1**: Constitución (una vez por proyecto - `constitution.md`)
- **Paso 2**: Especificación (`spec.md`)
- **Paso 3**: Clarificación
- **Paso 4**: Planificación (`plan.md`)
- **Paso 5**: Tareas (`tasks.md`)
- **Paso 6**: Implementación
- **Paso 7**: Validación
- **Loop al paso 2**: Mantenimiento
