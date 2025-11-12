pipeline {
  agent any

  environment {
    JEST_JUNIT_OUTPUT = 'test-results/junit.xml'
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          echo "Workspace: ${env.WORKSPACE}"
          echo "Node/OS info:"
          if (isUnix()) {
            sh 'uname -a || true'
          } else {
            bat 'ver'
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              echo "Node version:"
              node --version || true
              echo "npm version:"
              npm --version || true
              if [ -f package.json ]; then
                npm ci --no-audit --no-fund
              else
                echo "No package.json - skipping npm install"
              fi
            '''
          } else {
            bat '''
              echo Node version:
              node --version
              echo npm version:
              npm --version
              if exist package.json (
                npm ci --no-audit --no-fund
              ) else (
                echo No package.json - skipping npm install
              )
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
            bat """
              if not exist test-results mkdir test-results
              npx --yes jest --ci --reporters=default --reporters=jest-junit --outputFile=%JEST_JUNIT_OUTPUT%
            """
          }
        }
      }
      post {
        always {
          junit allowEmptyArchive: true, testResults: 'test-results/*.xml'
        }
      }
    }

    stage('Archive') {
      steps {
        script {
          if (isUnix()) {
            sh 'ls -la || true'
          } else {
            bat 'dir || true'
          }
        }
      }
    }
  }

  post {
    success {
      archiveArtifacts artifacts: '**/coverage/**, **/build/**, package*.json', excludes: 'node_modules/**,.git/**', fingerprint: true
    }
    always {
      junit allowEmptyArchive: true, testResults: 'test-results/*.xml'
      echo "Pipeline finished"
    }
  }
}
