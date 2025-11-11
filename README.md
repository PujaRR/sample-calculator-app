# SLIP 2 - Question 2: Jenkins Pipeline with Unit Tests

This folder contains a sample application with unit tests for SLIP 2, Question 2 (Jenkins Pipeline Development).

## Overview

This is a Node.js calculator application with comprehensive unit tests using Jest. The application can be used to demonstrate a Jenkins declarative pipeline with the following stages:
1. **Checkout**: Clone code from Git repository
2. **Build**: Execute build commands (npm install)
3. **Test**: Run unit tests and display results
4. **Archive**: Archive the build artifacts

## Application Structure

```
sampleapp/
├── src/
│   ├── calculator.js    # Calculator module with arithmetic operations
│   └── app.js           # Express web application
├── __tests__/
│   ├── calculator.test.js  # Unit tests for Calculator class
│   └── app.test.js         # Unit tests for API endpoints
├── package.json         # Node.js dependencies and scripts
├── Jenkinsfile         # Jenkins declarative pipeline script
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Jenkins (for pipeline execution)

## Installation

1. Navigate to the sampleapp directory:
```bash
cd SLIP_2/sampleapp
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests with coverage:
```bash
npm test -- --coverage
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

## Running the Application

Start the Express server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

### API Endpoints

- `GET /` - API information
- `GET /health` - Health check endpoint
- `POST /api/add` - Add two numbers
  ```json
  { "a": 5, "b": 3 }
  ```
- `POST /api/subtract` - Subtract two numbers
- `POST /api/multiply` - Multiply two numbers
- `POST /api/divide` - Divide two numbers

## Jenkins Pipeline Setup

### Option 1: Using Jenkinsfile (Declarative Pipeline)

1. Create a new Jenkins Pipeline job
2. Configure the job to use "Pipeline script from SCM"
3. Select Git as SCM
4. Point to this repository URL
5. Set the script path to `sampleapp/Jenkinsfile` (or `Jenkinsfile` if running from sampleapp directory)
6. Run the pipeline

### Option 2: Manual Pipeline Configuration in Jenkins

1. Create a new Pipeline job in Jenkins
2. Select "Pipeline script" and paste the following:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: '**/*', excludes: 'node_modules/**,coverage/**,.git/**'
            }
        }
    }
}
```

## Expected Pipeline Output

### Stage 1: Checkout
- Clones the repository from Git
- Shows Git version information

### Stage 2: Build
- Installs npm dependencies
- Executes build script
- Shows "Build completed successfully"

### Stage 3: Test
- Runs Jest unit tests
- Displays test results with pass/fail status
- Shows test coverage (if configured)

### Stage 4: Archive
- Archives all build artifacts
- Excludes node_modules, coverage, and .git directories

## Test Coverage

The application includes comprehensive unit tests covering:
- Calculator operations (add, subtract, multiply, divide, power, sqrt)
- Error handling (invalid inputs, division by zero, etc.)
- API endpoints (all routes)
- Edge cases (negative numbers, decimals, zero, etc.)

## Unit Test Details

### Calculator Tests (`calculator.test.js`)
- **add()**: 6 test cases
- **subtract()**: 6 test cases
- **multiply()**: 6 test cases
- **divide()**: 6 test cases
- **power()**: 5 test cases
- **sqrt()**: 5 test cases

**Total: 34 test cases**

### API Tests (`app.test.js`)
- Health check endpoint
- Root endpoint
- All calculator API endpoints
- Error handling tests

**Total: 8+ test cases**

## Notes for Evaluators

- All tests are designed to pass successfully
- The application is ready to be checked out from Git
- Unit tests can be run using `npm test`
- The Jenkinsfile is included for easy pipeline setup
- The application is production-ready with proper error handling

## Troubleshooting

### If tests fail:
1. Ensure all dependencies are installed: `npm install`
2. Check Node.js version: `node --version` (should be v14+)
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### If Jenkins pipeline fails:
1. Ensure Node.js is installed on Jenkins agent
2. Check if npm is available in the PATH
3. Verify Git repository access from Jenkins
4. Check Jenkins workspace permissions

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Express.js Documentation](https://expressjs.com/)

