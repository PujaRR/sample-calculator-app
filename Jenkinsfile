pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Stage 1: Checking out code from Git repository'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat 'echo Node version:'
                bat 'node --version'
                bat 'echo npm version:'
                bat 'npm --version'

                // 👇 Add this line (Jenkins installs jest-junit in its workspace)
                bat 'npm install --save-dev jest-junit'
            }
        }

        stage('Test') {
            steps {
                bat 'if not exist test-results mkdir test-results'
                bat 'npx --yes jest --ci --reporters=default --reporters=jest-junit --outputFile=test-results/junit.xml'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: '**/*', excludes: 'node_modules/**,coverage/**,.git/**'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
            echo 'Pipeline execution completed'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        success {
            echo '✅ Pipeline passed successfully!'
        }
    }
}
