pipeline {
    agent any

    environment {
        JEST_JUNIT_OUTPUT = 'test-results/junit.xml'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Stage 1: Checking out code from Git repository'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                          echo "Node version:"
                          node --version
                          echo "npm version:"
                          npm --version
                          npm install
                          npm install --save-dev jest-junit
                        '''
                    } else {
                        bat '''
                          echo Node version:
                          node --version
                          echo npm version:
                          npm --version
                          npm install
                          npm install --save-dev jest-junit
                        '''
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                          mkdir -p test-results
                          npx --yes jest --ci --reporters=default --reporters=jest-junit --outputFile=${JEST_JUNIT_OUTPUT}
                        '''
                    } else {
                        bat '''
                          if not exist test-results mkdir test-results
                          npx --yes jest --ci --reporters=default --reporters=jest-junit --outputFile=%JEST_JUNIT_OUTPUT%
                        '''
                    }
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                }
            }
        }

        stage('Archive') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'ls -la || true'
                    } else {
                        bat 'dir'
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
            archiveArtifacts artifacts: '**/coverage/**, **/build/**, package*.json', excludes: 'node_modules/**,.git/**', fingerprint: true
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
            echo 'Pipeline execution completed'
        }
    }
}
