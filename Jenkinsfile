pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps { 
                git branch: 'devops', url: 'https://github.com/angelayracarino/Group4COMP308Project.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo "Test"
            }
        }
        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${registry}/${imageName}:${imageTag} ."
            }
        }
        
        stage("Docker login") {
            steps {
             script {

                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    bat "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                }
             }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                bat "docker push ${registry}/${imageName}:${imageTag}"
            }
        }
        stage ('Deploy to Dev Env') {
            steps {
                echo "Deploy to Dev Env"
            }
        }
        stage ('Deploy to QAT Env') {
            steps {
                echo "Deploy to QAT Env"
            }
        }
        stage ('Deploy to Staging Env') {
            steps {
                echo "Deploy to Staging Env"
            }
        }
        stage ('Deploy to Prod Env') {
            steps {
                sh 'docker run  -p 3000:3000 -d angelayracarino/Group4COMP308Project:latest'
            }
        }
    }
}