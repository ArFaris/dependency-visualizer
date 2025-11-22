# Dependency Graph Visualizer - Stage 5

## Описание

CLI-приложение для визуализации графа зависимостей NPM пакетов. **Этап 5** реализует генерацию диаграммы в формате PlantUML и поддерживает вывод зависимостей в формате ASCII-дерева.

## Установка и запуск

### Предварительные требования
- Node.js 18 или выше
- npm
- Доступ к интернету (для работы с npm registry и генерации диаграммы)

### Установка
```bash
# Клонирование репозитория
git clone <repository-url>
cd dependency-visualizer

# Установка зависимостей
npm install
```

### Запуск
```bash
# Анализ пакета из npm registry
node src/cli/index.js --package <package-name>

# Анализ из локального package.json
node src/cli/index.js --package <package-name> --url <path-to-package.json>
```

## Параметры командной строки

### Обязательные параметры
| Параметр      | Алиас | Тип     | Описание                                              |
|---------------|-------|---------|-------------------------------------------------------|
| `--package`   | `-p`  | string  | **Имя анализируемого пакета** (обязательный параметр) |

### Дополнительные параметры
| Параметр              | Алиас | Тип     | Описание                                    | По умолчанию |
|-----------------------|-------|---------|---------------------------------------------|--------------|
| `--url`               | `-u`  | string  | URL репозитория или путь к файлу            | `not set`    |
| `--test-mode`         | `-t`  | boolean | Режим работы с тестовым репозиторием        | `false`      |
| `--ascii-tree`        | `-a`  | boolean | Режим вывода в формате ASCII-дерева         | `false`      |
| `--max-depth`         | `-d`  | number  | Максимальная глубина анализа зависимостей   | `10`         |
| `--filter`            | `-f`  | string  | Подстрока для фильтрации пакетов            | `not set`    |
| `--reverse`           | `-r`  | string  | Пакет для поиска обратных зависимостей      | `not set`    |
| `--plant-uml-diagram` | `-pu` | boolean | Генерация диаграммы в формате PlantUML      | `false`      |

## Примеры использования

### Базовые сценарии

**Анализ популярного пакета:**
```bash
node src/cli/index.js --package express
```

**Анализ из локального package.json:**
```bash
node src/cli/index.js --package test-package --url ./tests/test-package.json
```

**Анализ из локального репозитория:**
```bash
node src/cli/index.js --package A --url ./tests/test-repo.json
```

**Просмотр справки:**
```bash
node src/cli/index.js --help
```