pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // Set the environment variable
        registry = 'melanonuevo'
        image_name = 'hospital-project'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "current build_id is ${env.BUILD_ID}"
                // Get some code from a GitHub repository
                git branch: 'devops', url: 'https://github.com/angelayracarino/Group4COMP308Project'
            }
        }
        stage('Build Server') {
            steps {
                dir('server') {
                    bat 'npm install'
                    echo 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                dir('server') {
                    echo 'npm test'
                }
            }
        }
        stage('Deliver') {
            steps {
                dir('server') {
                    bat 'npm install'
                    echo 'npm run build'
                    echo 'npm run release'
                    archiveArtifacts artifacts: '**', allowEmptyArchive: true
                }
            }
        }
        stage('Build Image') {
            steps {
                bat "docker build -t ${registry}/${image_name}:${env.BUILD_ID} ."
            }
        }
        stage('Login Docker') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    bat "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                }
            }
        }
        stage('Push Image') {
            steps {
                script {
                    bat "docker push ${registry}/${image_name}:${env.BUILD_ID}"
                }
            }
        }
        stage('Dev Env') {
            steps {
                echo 'Name the dev environment'
                echo 'Deploy the artifact to the dev environment'
            }
        }
        stage('QAT Env') {
            steps {
                echo 'Name the QAT environment'
                echo 'Deploy the artifact to the QAT environment'
            }
        }
        stage('Staging Env') {
            steps {
                echo 'Name the staging environment'
                echo 'Deploy the artifact to the staging environment'
            }
        }
        stage('Production Env') {
            steps {
                echo 'Name the production environment'
                echo 'Deploy the artifact to the production environment'
                echo "docker run -d -p 8083:8083 ${registry}/${image_name}:${env.BUILD_ID}"
            }
        }
    }
}
