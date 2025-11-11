pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Stage 1: Checking out code from Git repository'
                checkout scm
                sh 'git --version'
                sh 'echo "Repository cloned successfully"'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Stage 2: Building the application'
                sh 'npm install'
                sh 'npm run build'
                echo 'Build completed successfully'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Stage 3: Running unit tests'
                sh 'npm test'
            }
            post {
                always {
                    echo 'Test stage completed'
                    // Archive test results if using JUnit reporter
                }
            }
        }
        
        stage('Archive') {
            steps {
                echo 'Stage 4: Archiving build artifacts'
                archiveArtifacts artifacts: '**/*', excludes: 'node_modules/**,coverage/**,.git/**'
                echo 'Artifacts archived successfully'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Pipeline execution completed'
            // Clean workspace if needed
            // cleanWs()
        }
    }
}

