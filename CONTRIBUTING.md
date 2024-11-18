# Contributing to Snapper

Thank you for considering contributing to Snapper! We welcome contributions from the community and are excited to work with you.

## Getting Started

To start contributing, follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top-right of the [Snapper repository](https://github.com/sayfer-io/Snapper) to create a copy in your GitHub account.

2. **Clone your fork**: Clone the forked repository to your local machine:

   ```sh
   git clone https://github.com/your-username/Snapper.git
   cd Snapper
   ```

3. **Install dependencies**: Run the following command to install the necessary dependencies:

   ```sh
   npm install
   ```

4. **Create a new branch**: Create a branch for your changes with a descriptive name:

   ```sh
   git checkout -b feature/my-new-feature
   ```

## Making Changes

1. **Implement changes**: Modify the appropriate files to implement your changes. Follow the project's coding conventions outlined below.

2. **Run tests**: Ensure your changes do not break existing functionality by running:

   ```sh
   npm test
   ```

3. **Add tests**: If you're adding a new feature or fixing a bug, write test cases to cover the changes in the `__tests__` folder.

4. **Commit changes**: Use descriptive commit messages:

   ```sh
   git add .
   git commit -m "Add feature: detailed error reporting"
   ```

5. **Push your branch**: Push your changes to your fork:

   ```sh
   git push origin feature/my-new-feature
   ```

## Submitting a Pull Request

1. **Open a pull request**: Go to the original Snapper repository and click "New pull request." Select your branch and provide a clear, descriptive title and summary.

2. **Address feedback**: Maintainers will review your pull request and may request changes. Be responsive and address feedback promptly.

3. **Merge**: Once approved, your pull request will be merged into the main branch.

## Style Guide

Maintaining consistent code quality is essential. Please follow these guidelines:

### General Guidelines

- Use **TypeScript** features wherever applicable.
- Use meaningful variable and function names.
- Write modular, reusable, and well-documented code.
- Avoid magic numbers; use constants or enums.

### Formatting

- Use `prettier` for consistent code formatting. Run:

  ```sh
  npm run format
  ```

- Ensure your code passes linting:

  ```sh
  npm run lint
  ```

### Commit Message Guidelines

- Use the present tense (e.g., "Add feature" instead of "Added feature").
- Write in the imperative mood (e.g., "Refactor logic for..." not "Refactored logic for...").
- Limit the first line to **72 characters**.
- Reference issues and pull requests (e.g., `Fix #123` or `Related to #456`).

### Testing

- All new features and bug fixes must include corresponding tests.
- Use clear, descriptive test names to explain the scenario being tested.

## Additional Resources

- [Issue Tracker](https://github.com/sayfer-io/Snapper/issues): Report bugs or suggest features.
- [Documentation](docs/README.md): Learn about Snapper's functionality.

## Questions?

If you have questions or need help, open an issue on the [Issue Tracker](https://github.com/sayfer-io/Snapper/issues) or contact the maintainers directly.

---

We value your contributions and look forward to working together to improve Snapper!
