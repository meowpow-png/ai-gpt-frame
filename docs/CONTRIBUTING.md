# Contribution Guidelines

This project follows a structured process to ensure maintainability and consistency. Contributions, including bug reports, feature enhancements, and documentation updates, should align with project standards. Review existing issues before contributing to avoid duplication and streamline collaboration.

## 🏷 Issue Labels Guide  

To keep the issue tracker organized and easy to navigate, use labels to categorize issues. When creating a new issue, use the appropriate label based on the type of problem or request you are reporting. Below are the descriptions of the labels used in this repository:  

### 🐛 Bug  

**Definition:**  
A bug is an unexpected behavior, error, or defect in the code that causes the application to function incorrectly.  

**When to Use:**  
- Instructions cause AI errors or unexpected behavior.  
- An AI feature does not work as intended.  
- Instructions are interpreted ambiguously.

**Examples:**  
- User prompt causes AI to output an error in chat.  
- Analysis Iterative Looping feature does not iterate.  
- AI interprets user prompt incorrectly.  

---

### 🚀 Feature  

**Definition:**  
A feature adds or improves functionality to enhance the project.  

**When to Use:**  
- Request for a new capability, component, or tool.  
- Suggestion to expand existing functionality.  
- Integration with third-party services.  

**Examples:**  
- Implementing a scoring system for instruction set analysis.  
- Improving the input parsing system to flag content with ethical violations.  
- Connecting FRAME with GitHub via API.  

---

### ⚡ Optimization  

**Definition:**  
Optimization changes the existing code to increase performance, maintainability, or efficiency, without changing functionality.  

**When to Use:**  
- Reducing AI prompt query time or improving analysis accuracy.  
- Refactoring code for better readability or maintainability.  
- Replacing inefficient algorithms or functions with better alternatives.  

**Examples:**  
- Optimize analysis by writing more efficient instructions.  
- Refactor legacy code to improve maintainability.  

---

### 📖 Documentation  

**Definition:**  
Documentation updates improve, add, or fix information in the project’s documentation, such as README files, API references, or code comments.  

**When to Use:**  
- Updating outdated or incorrect documentation.  
- Writing new guides, tutorials, or examples.  
- Enhancing feature reference documentation.  
- Adding contribution guidelines.  

**Examples:**  
- Update README with setup instructions.  
- Add documentation for newly added instruction features.  
- Improve code comments for better understanding.  

---

### 🧪 Test  

**Definition:**  
Testing issues involve writing, fixing, or improving automated tests to ensure the stability and reliability of the codebase.  

**When to Use:**  
- Writing unit tests for features.  
- Adding integration or end-to-end tests.  
- Fixing failing test cases.  
- Improving test coverage.  
- Setting up or optimizing a CI/CD pipeline for automated testing.  

**Examples:**  
- Add unit tests for instruction input parsing.  
- Fix failing integration tests in CI pipeline.  
- Improve test coverage for error detection.  

---

### How to Use Labels  

- When submitting a new issue, apply the most appropriate label.  
- If unsure, maintainers will adjust labels as needed.  
- Issues may have multiple labels (e.g., a **Bug** might also need a **Test** label if it requires a test fix).    

---

## Branch Naming Conventions  

To maintain clarity and organization within the repository, we follow a set of rules when naming branches. This ensures that every team member can quickly understand the purpose of a branch.  

### General Format:  

- **Feature branches**: `feat/<issue-id>`  
- **Bugfix branches**: `bug/<issue-id>`  
- **Document branches**: `doc/<issue-id>`  
- **PR branches** (for temporary PRs or non-issue related branches): `pr/<issue-id>`  

### Additional Guidelines:  

- **Use hyphens (`-`)** to separate words for readability (e.g., `feature/search-function`).  
- **Be concise**: Keep branch names short, feature branches must match the feature.  
- **Use lowercase letters** to avoid confusion with case-sensitive environments.  
- Avoid special characters (except hyphens) in branch names.  
