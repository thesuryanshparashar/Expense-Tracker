# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.3.0-0] - 2024-12-10
### Added
- Implemented dynamic pagination for the expense list table to improve navigation through large datasets.
- Added wallet balance validation to ensure expenses cannot exceed the available wallet balance.
- Integrated predefined expense categories to streamline data entry.

### Changed
- Enhanced UI styling for the expense form and table using NextUI components.
- Updated the wallet card component to dynamically display balance updates.

### Fixed
- Resolved a bug where expense records were not persisting correctly in local storage on some browsers.
- Fixed an issue where the delete button was unresponsive on certain rows in the table.

---

## [1.2.0-0] - 2024-11-20
### Added
- Basic functionality to add, view, and delete expenses.
- Wallet management card to track the total wallet balance.

---

## [1.1.0-0] - 2024-11-10
### Added
- Initial release with basic React + Vite setup.
- Local storage integration for expense tracking.

---

## [Unreleased]
### Planned Features
- Implement user authentication for personalized experience.
- Database integration for efficient storage of expense records.
- Add expense filtering and sorting capabilities.
- Introduce export functionality for expense records (CSV/Excel/PDF).
