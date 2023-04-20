pipeline {
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'devops', description: 'The name of the Git branch to build')
    }

    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        registry = 'melanonuevo'
        imageName = 'comp367project'
        imageTag = '1.0'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/angelayracarino/Group4COMP308Project.git'
            }
        }
    }

        stage('Build') {
            steps {
                dir('/server/') {
                    bat 'npm install'
                }
                dir('/react-client/') {
                    bat 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            // Add your test commands here
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${registry}/${imageName}:${imageTag} ."
            }
        }

        stage('Docker login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    bat "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push ${registry}/${imageName}:${imageTag}"
            }
        }

        stage('Deploy to Dev Env') {
            steps {
                echo 'Deploying to Dev Env...'
            // Add your deployment commands here
            }
        }

        stage('Deploy to QAT Env') {
            steps {
                echo 'Deploying to QAT Env...'
            // Add your deployment commands here
            }
        }

        stage('Deploy to Staging Env') {
        stage('Deploy to Staging Env') {
            steps {
                echo 'Deploying to Staging Env...'
            // Add your deployment commands here
            }
        }

        stage('Deploy to Prod Env') {
        stage('Deploy to Prod Env') {
            steps {
                echo 'Deploying to Prod Env...'
                bat "docker run -p 3000:3000 -d ${registry}/${imageName}:${imageTag}"
            }
        }
    }
}