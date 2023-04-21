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
        imageTag = 'latest'
        //prod = 'prod'
        //dev = 'dev'
        //qat = 'qat'
        //staging = 'staging'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/angelayracarino/Group4COMP308Project.git'
            }
        }
        stage('Build') {
            steps {
                dir('C:/ProgramData/Jenkins/.jenkins/workspace/COMP367_FinalProject/server') {
                    bat 'npm install'
                }
                dir('C:/ProgramData/Jenkins/.jenkins/workspace/COMP367_FinalProject/react-client') {
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
        stage('Deliver') {
            steps {
                dir('server') {
                    bat 'npm install'
                    echo 'npm run build'
                    echo 'npm run release'
                    archiveArtifacts artifacts: '**', allowEmptyArchive: true
                }
                dir('react-client') {
                    bat 'npm install'
                    echo 'npm run build'
                    echo 'npm run release'
                    archiveArtifacts artifacts: '**', allowEmptyArchive: true
                }
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
                //bat "docker run -p 5000:5000 -d ${registry}/${imageName}:${dev}"
            }
        }
        stage('Deploy to QAT Env') {
            steps {
                echo 'Deploying to QAT Env...'
                //bat "docker run -p 4000:4000 -d ${registry}/${imageName}:${qat}"
            }
        }
        stage('Deploy to Staging Env') {
            steps {
                echo 'Deploying to Staging Env...'
                //bat "docker run -p 3000:3001 -d ${registry}/${imageName}:${staging}"
            }
        }
        stage('Deploy to Prod Env') {
            steps {
                echo 'Deploying to Prod Env...'
                echo 'Demo'
                bat "docker run -p 4000:4000 -d ${registry}/${imageName}:${imageTag}"
            }
        }
    }
}
