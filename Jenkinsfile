pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // Set the environment variable
        registry = 'acduqu'
        image_name = 'hospital-project'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "current build_id is ${env.BUILD_ID}"
                // Get some code from a GitHub repository
                git branch: 'devops_project', url: 'https://github.com/angelayracarino/Group4COMP308Project'
            }
        }
        stage('Build Client') {
            steps {
                dir('react-client') {
                    bat 'npm install'
                    echo 'npm run build'
                }
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
                dir('react-client') {
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
                    archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                }
                dir('react-client') {
                    bat 'npm install'
                    echo 'npm run build'
                    echo 'npm run release'
                    archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${registry}/${image_name}:${env.BUILD_ID} ."
            }
        }
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: '92615733-e231-4a47-ac25-8feb884d4227', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    bat "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    bat "docker push ${registry}/${image_name}:${env.BUILD_ID}"
                }
            }
        }
        stage('Deploy to Dev Env') {
            steps {
                echo 'Name the dev environment'
                echo 'Deploy the artifact to the dev environment'
            }
        }
        stage('Deploy to QAT Env') {
            steps {
                echo 'Name the QAT environment'
                echo 'Deploy the artifact to the QAT environment'
            }
        }
        stage('Deploy to Staging Env') {
            steps {
                echo 'Name the staging environment'
                echo 'Deploy the artifact to the staging environment'
            }
        }
        stage('Deploy to Production Env') {
            steps {
                echo 'Name the production environment'
                echo 'Deploy the artifact to the production environment'
                echo "docker run -d -p 8083:8083 ${registry}/${image_name}:${env.BUILD_ID}"
                echo 'demo'
            }
        }
    }
} 
