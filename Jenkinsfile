pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // Set the environment variable
        registry = 'apple-jane'
        imageName = 'comp308project'
        tag = 'latest'
        credentialsId = '92615733-e231-4a47-ac25-8feb884d4227'
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
                    bat 'npm run release'
                    //archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                }
                dir('react-client') {
                    bat 'npm install'
                    echo 'npm run build'
                    bat 'npm run release'
                    //archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t ${registry}/${imageName}:${tag} .'
            }
        }
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: credentialsId, passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                bat 'docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD} ${registry}'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                bat 'docker push ${registry}/${imageName}:${tag}'
            }
        }
        stage('Deploy to Dev Env') {
            steps {
                echo 'Deploy the artifact to the dev environment'
            }
        }
        stage('Deploy to QAT Env') {
            steps {
                echo 'Deploy the artifact to the QAT environment'
            }
        }
        stage('Deploy to Staging Env') {
            steps {
                echo 'Deploy the artifact to the staging environment'
            }
        }
        stage('Deploy to Production Env') {
            steps {
                echo 'Deploy the artifact to the production environment'
                bat 'docker run -d -p 80:80 ${registry}/${imageName}:${tag}'
            }
        }
    }
}
