# Workflow Generator (Prototype)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A React application that explores using AI to generate interactive workflows and forms from natural language descriptions. It leverages the `granite3.3:8b` model via [Ollama](https://ollama.com) + [LangChain](https://www.langchain.com/) to turn user inputs into structured, customizable form-based procedures.

## Table of Contents

- [Workflow Generator (Prototype)](#workflow-generator-prototype)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Planned Features](#planned-features)
  - [Prerequisites](#prerequisites)
    - [Pull the AI Model](#pull-the-ai-model)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)

## Features

- **AI-Powered Workflow Generation**: Uses natural language input to generate structured forms and processes.
- **Interactive Form Preview**: Currently supports text fields, checkboxes, and image + video uploads.
- **JSON Import/Export**: Save and load workflows to JSON.

## Planned Features

- Edit generated workflows
- Ability to fill in and submit generated forms
- Workflow validation and error handling
- Better support for branching logic and conditions

## Prerequisites

Make sure the following are installed before running the app:

- **Node.js** (v16 or higher)
- **Yarn** (as the package manager)
- **Ollama** (for running the AI model)

### Pull the AI Model

To use the AI features, pull the required model:

```bash
ollama pull granite3.3:8b
```

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/DylanAlmond/workflow-generator.git
   cd procedure-generator
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Start the Development Server**

   ```bash
   yarn dev
   ```

## Usage

1. **Describe Your Workflow**

   Provide a detailed description of the workflow or form you want to build. This can include what steps are involved, the types of inputs you need (e.g., text fields, checkboxes, media uploads), and any specific requirements for each step.
   You can also try describing the structure or layout—such as grouping steps in to sections, creating a summary section, etc. The AI model will use this input to generate a structured, interactive form layout.

2. **Import or Export Workflows**

   Save your workflows in JSON format or import an existing one to preview.

## License

This project is licensed under the [MIT License](LICENSE).
