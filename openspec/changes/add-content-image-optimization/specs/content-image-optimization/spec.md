## ADDED Requirements

### Requirement: Markdown images render through Nuxt Image
Nuxt Content Markdown images SHALL render through the Nuxt Image component while preserving standard Markdown image authoring.

#### Scenario: Rendering a Markdown image
- **WHEN** an article contains a standard Markdown image
- **THEN** the rendered image is produced by the Nuxt UI prose image component
- **THEN** the rendered image uses Nuxt Image optimization

### Requirement: Article image styling is preserved
Optimized Markdown images SHALL keep the existing article image visual treatment.

#### Scenario: Viewing an optimized article image
- **WHEN** a reader views an article image
- **THEN** the image remains constrained to the article width
- **THEN** the image keeps the existing border and radius treatment

### Requirement: Article image preview is preserved
Optimized Markdown images SHALL keep the existing click-to-preview interaction.

#### Scenario: Opening an optimized article image
- **WHEN** a reader clicks an optimized article image
- **THEN** the image opens in the existing Nuxt UI zoom preview

### Requirement: Current remote content images are allowed
The image optimization configuration SHALL allow the remote image domains currently used by content examples.

#### Scenario: Rendering the Markdown style guide image
- **WHEN** the Markdown style guide renders its remote image
- **THEN** Nuxt Image can resolve the image source without domain blocking
