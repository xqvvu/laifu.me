# site-voice Specification

## Purpose

Define durable public-facing copy for the personal writing site.

## ADDED Requirements

### Requirement: Site exposes a concise writing motto

The site SHALL expose a concise motto that reflects slow, durable personal writing.

#### Scenario: Visitor opens the home page

- **WHEN** the visitor views the home hero
- **THEN** the page presents a short motto near the primary site title or description
- **AND** the motto avoids marketing-style claims

### Requirement: Site copy uses reusable source strings

Site-level title, tagline, description, and principles SHALL be defined in a reusable source rather than duplicated directly across public page templates.

#### Scenario: Site metadata and home copy render

- **WHEN** the home page renders metadata and hero copy
- **THEN** the metadata and visible copy use the shared site copy source

### Requirement: Site principles remain quiet and practical

The site SHALL present a small set of principles that describe the writing mode without changing the site's text-focused layout.

#### Scenario: Visitor scans the home hero

- **WHEN** the visitor reads the hero metadata strip or stat row
- **THEN** the principles communicate durable notes, clear judgment, and reusable experience
