## ADDED Requirements

### Requirement: Mobile article table of contents starts compact
Article pages with a table of contents SHALL render the mobile inline table of contents in a compact collapsed state by default.

#### Scenario: Opening a long article on mobile
- **WHEN** a reader opens an article with headings on a narrow mobile viewport
- **THEN** the table of contents trigger is visible before the article body
- **THEN** the heading list is not expanded until the reader opens it

### Requirement: Article code blocks remain visually contained
Article Markdown code blocks SHALL remain visually contained within the article column while preserving horizontal scrolling for long lines.

#### Scenario: Viewing long code on mobile
- **WHEN** a reader views an article code block with long lines on a narrow mobile viewport
- **THEN** the code block boundary remains within the article column
- **THEN** long code remains available through horizontal scrolling

### Requirement: Collapsible long-code sections do not crowd following content
Collapsed long-code examples SHALL leave enough space after their expand control so the next article heading or paragraph is visually separate.

#### Scenario: Viewing a collapsed long-code block
- **WHEN** a reader reaches a collapsed long-code block
- **THEN** the expand control is visible within the code block
- **THEN** the following article content starts after a clear vertical gap
