[x] Setup lint using biome and clear up lint errors
[x] Install gitleaks and configure husky pre-commit hook

# Gitleaks Integration Summary

## Actions Performed
1. **Installed Gitleaks**: Installed `gitleaks` version 8.30.0 using Homebrew.
2. **Configured Husky Pre-commit Hook**:
   - Modified `.husky/pre-commit` to include `gitleaks detect --staged --verbose`.
   - Fixed the Husky hook template to properly source `husky.sh`.
   - Integrated with existing `lint-staged` execution.
3. **Updated package.json**: Added a `"gitleaks"` script for manual full-repository scans.
4. **Verification**: Successfully ran `gitleaks detect --verbose` to ensure the installation and configuration were valid.

## Usage
- **Pre-commit**: Automatically scans staged changes during `git commit`.
- **Manual Scan**: Execute `bun run gitleaks` to check the entire repository history.

[x] setup semgrep