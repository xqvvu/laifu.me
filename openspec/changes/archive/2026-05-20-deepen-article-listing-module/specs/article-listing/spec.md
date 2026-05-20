## ADDED Requirements

### Requirement: Public Article Listings exclude drafts consistently

Every Article Listing and Feed Output source SHALL exclude Blog Articles whose front matter marks them as drafts.

#### Scenario: Listing public Blog Articles

- **WHEN** a page or Feed Output requests public Blog Articles
- **THEN** Blog Articles with `draft: true` are absent from the result
- **THEN** non-draft Blog Articles remain eligible for display or output

### Requirement: Article Listings use consistent newest-first ordering

Article Listings that present Blog Articles by recency SHALL use the same newest-first ordering by Blog Article date.

#### Scenario: Rendering a recency-based Article Listing

- **WHEN** the home page, blog index, archive, Tag page, RSS feed, or related-article source requests Blog Articles by recency
- **THEN** the result is ordered from newest Blog Article date to oldest Blog Article date

### Requirement: Tag indexes derive from public Blog Articles

Tag indexes SHALL be derived only from public Blog Articles and SHALL use stable locale-aware sorting where an alphabetical Tag order is required.

#### Scenario: Building Tag navigation or Tag URLs

- **WHEN** the blog index or sitemap builds Tag entries
- **THEN** Tags from draft Blog Articles are excluded
- **THEN** alphabetically ordered Tags use `zh-CN` locale comparison

### Requirement: Related Articles rank by shared Tags

Related Articles SHALL exclude the current Blog Article and rank public Blog Articles by the number of Tags shared with the current Blog Article, using newest-first date order as the tie breaker.

#### Scenario: Rendering related articles for a Blog Article

- **WHEN** a Blog Article has one or more Tags
- **THEN** related articles include only other public Blog Articles with at least one shared Tag
- **THEN** articles with more shared Tags appear before articles with fewer shared Tags
- **THEN** articles with equal shared Tag counts appear newest first

### Requirement: Search matches listing fields consistently

Blog index search SHALL match against Blog Article title, description, and Tags from the public Article Listing index.

#### Scenario: Searching the blog index

- **WHEN** a reader searches the blog index
- **THEN** matching public Blog Articles are found by title, description, or Tag text
- **THEN** draft Blog Articles are not returned by search
