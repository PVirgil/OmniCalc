# OmniCalc

> **A futuristic, data-driven universal calculator platform built with vanilla HTML, CSS, and JavaScript.**

OmniCalc is a high-performance calculator website designed around a simple philosophy:

> **Every calculator is just data.**

Instead of building a separate page and JavaScript logic for every calculator, OmniCalc uses a reusable architecture where each calculator is defined as a single JavaScript object. The UI automatically generates calculator cards, forms, validation, results, search indexing, and modal interfaces.

This makes the project extremely easy to extend while remaining lightweight and dependency-free.

---

# Overview

OmniCalc is intended to become a scalable library of calculators across multiple industries, including:

- Mathematics
- Finance
- Business
- Physics
- Science
- Engineering
- Health
- Computing
- Unit Conversions

Every calculator follows the exact same internal structure, allowing new calculators to be added with minimal code.

---

# Philosophy

Rather than hardcoding every calculator page, OmniCalc uses a **configuration-first architecture**.

Each calculator contains:

- Metadata
- Inputs
- Formula display
- Calculation logic
- Output formatting

The application then renders everything automatically.

In other words:

```
Calculator Definition
        ↓
Automatic UI Generation
        ↓
Automatic Input Handling
        ↓
Automatic Calculation
        ↓
Automatic Result Rendering
```

---

# Key Features

## Universal Search

Users can instantly search calculators by:

- Name
- Category
- Description
- Formula

The search updates live while typing.

Keyboard shortcut:

```
Ctrl + K
```

(or **⌘ + K** on macOS)

---

## Category Filtering

Calculators are organized into disciplines including:

- Math
- Finance
- Business
- Physics
- Science
- Engineering
- Health
- Computing
- Conversions

Each category automatically displays the number of available calculators.

---

## Data-Driven Architecture

Every calculator follows the same schema.

Example:

```javascript
{
    id,
    name,
    category,
    icon,
    accent,
    description,
    formula,
    fields,
    calculate()
}
```

This allows the application to generate:

- calculator cards
- modal windows
- forms
- validation
- result panels

without writing additional UI code.

---

# Included Calculators

The current version includes twelve working calculators:

| Category | Calculator |
|-----------|------------|
| Finance | Compound Interest |
| Finance | Mortgage Payment |
| Business | Profit Margin |
| Math | Percentage Change |
| Math | Quadratic Formula |
| Math | Circle Geometry |
| Physics | Kinetic Energy |
| Engineering | Ohm's Law |
| Science | Density |
| Health | Body Mass Index (BMI) |
| Conversions | Temperature Converter |
| Computing | Data Storage Converter |

---

# Project Structure

```
/
│
├── index.html
├── styles.css
├── app.js
├── netlify.toml
└── README.md
```

---

# File Breakdown

## index.html

Contains the application's structure.

Major sections include:

- Hero section
- Search interface
- Category sidebar
- Calculator grid
- Formula showcase
- About section
- Calculator modal
- Footer

The HTML is intentionally minimal because most interactive content is generated dynamically.

---

## styles.css

Responsible for the complete visual identity including:

- futuristic UI
- glassmorphism
- responsive layout
- animations
- starfield styling
- calculator cards
- modal appearance
- typography
- accessibility improvements
- high contrast mode

---

## app.js

The heart of the application.

This file contains:

- calculator definitions
- category definitions
- rendering engine
- search
- filtering
- modal generation
- validation
- calculation logic
- formatting helpers
- keyboard shortcuts
- starfield animation

Almost every feature lives inside this file.

---

# How the Rendering Engine Works

When the page loads:

```
Load calculator definitions
          ↓
Render categories
          ↓
Render calculator cards
          ↓
Wait for user interaction
```

When a user opens a calculator:

```
Find calculator
        ↓
Generate form
        ↓
Attach event listeners
        ↓
Watch inputs
        ↓
Run calculation
        ↓
Display result
```

Because everything is generated dynamically, every calculator behaves consistently.

---

# Calculator Object Anatomy

Every calculator consists of two major sections.

## 1. Metadata

```javascript
id
name
category
icon
accent
description
formula
```

These values control the UI.

---

## 2. Fields

Fields define user inputs.

Example:

```javascript
fields: [
    {
        key: "weight",
        label: "Weight",
        type: "number",
        value: 75
    }
]
```

Supported input types include:

- number
- select

---

## 3. Calculation Function

Each calculator contains its own calculation function.

Example:

```javascript
calculate(values) {
    ...
    return {
        value: "...",
        extra: "..."
    }
}
```

The returned object automatically populates the result panel.

---

# Automatic UI Generation

The interface is never manually written for each calculator.

Instead:

```
Calculator Object
       ↓
Create Card
       ↓
Create Form
       ↓
Attach Inputs
       ↓
Run Formula
       ↓
Display Results
```

This dramatically reduces duplicated code.

---

# Search System

Search indexes multiple pieces of information simultaneously:

- calculator name
- category
- description
- displayed formula

Search suggestions appear automatically while typing.

---

# Modal System

Every calculator opens inside the same reusable modal component.

The modal is generated dynamically from the calculator definition.

It includes:

- title
- description
- input fields
- live results
- formula display
- additional explanatory text

---

# Input Validation

Each calculator can perform its own validation.

Example:

```javascript
if (value === 0)
    throw new Error("Value cannot be zero.");
```

Errors are automatically displayed inside the result panel without breaking the application.

---

# Number Formatting

Several helper functions keep outputs consistent.

Examples include:

- currency formatting
- decimal formatting
- percentage formatting

These rely on the browser's `Intl.NumberFormat` API for locale-aware output.

---

# Visual Design

The interface combines several modern UI concepts:

- Glassmorphism
- Neon accents
- Animated starfield background
- Futuristic typography
- Responsive layout
- Floating cards
- Soft gradients
- High contrast accessibility mode

Despite the visual complexity, the project uses **no external UI framework**.

---

# Accessibility

The application includes several accessibility features:

- keyboard navigation
- focusable calculator cards
- semantic HTML
- ARIA labels
- accessible dialog element
- keyboard shortcuts
- Escape-to-close modal behavior

---

# Performance

OmniCalc intentionally avoids heavy frameworks.

Current architecture includes:

- No React
- No Vue
- No Angular
- No build tools
- No npm dependencies

Everything runs using native browser APIs.

This keeps:

- load times fast
- bundle size small
- maintenance simple

---

# Scalability

Although the current project contains twelve calculators, the architecture is designed to support hundreds or even thousands.

Future improvements could include:

- external calculator database
- JSON-based calculator definitions
- formula editor
- unit conversion engine
- localization
- user accounts
- favorites
- calculation history
- API integration
- scientific notation support
- graphing
- printable reports

---

# Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Browser Dialog API
- Intl.NumberFormat API
- Canvas API (animated background)

No third-party JavaScript libraries are required.

---

# Design Goals

OmniCalc was designed around five principles:

- **Fast** — instant loading with no framework overhead.
- **Reusable** — one architecture powers every calculator.
- **Maintainable** — calculators are self-contained objects.
- **Scalable** — easy to expand into hundreds of formulas.
- **Readable** — straightforward vanilla JavaScript without unnecessary abstraction.

---

# Future Vision

The current implementation serves as a strong foundation for a much larger calculation platform.

Potential long-term directions include:

- thousands of calculators
- AI-powered formula generation
- searchable knowledge base
- interactive graphs
- educational explanations
- saved calculations
- cloud synchronization
- API endpoints
- mobile application
- plugin ecosystem

The existing architecture already supports this evolution with minimal structural changes.
