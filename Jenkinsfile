pipeline {
    agent any
    
    environment {
        PROJECT_NAME = 'Proyek_bnsp1'
        // Path di Linux container (bukan Windows)
        DEPLOY_DIR = '/var/jenkins_home/deployed-app'
        BUILD_INFO = 'build-info.txt'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔍 Checking out source code from GitHub...'
                // Git checkout sudah otomatis oleh SCM
                
                // Print working directory dan list files
                sh 'echo "Current directory: $(pwd)"'
                sh 'ls -la'
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ Building application...'
                sh """
                    echo "Building ${PROJECT_NAME}..."
                    echo "Build started at: $(date)"
                    echo "Files in repository:"
                    ls -la
                """
                
                // Create build info file
                sh """
                    echo "Build Number: ${BUILD_NUMBER}" > ${BUILD_INFO}
                    echo "Build Date: $(date)" >> ${BUILD_INFO}
                    echo "Repository: https://github.com/cekzakyiriansyah/Proyek_bnsp1.git" >> ${BUILD_INFO}
                    echo "Built by: Jenkins CI/CD" >> ${BUILD_INFO}
                    echo "Node: $(uname -a)" >> ${BUILD_INFO}
                """
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running validation tests...'
                
                sh """
                    echo "Checking required files..."
                    
                    if [ -f "index.html" ]; then
                        echo "✅ index.html found"
                    else
                        echo "❌ index.html missing"
                        exit 1
                    fi
                    
                    if [ -f "style.css" ]; then
                        echo "✅ style.css found"
                    else
                        echo "❌ style.css missing"
                        exit 1
                    fi
                    
                    if [ -f "test.js" ]; then
                        echo "✅ test.js found"
                    else
                        echo "⚠️ test.js not found (optional)"
                    fi
                    
                    echo "All file checks completed" > test-results.txt
                """
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                
                // Create deploy directory
                sh """
                    mkdir -p ${DEPLOY_DIR}
                    echo "Deployment directory created: ${DEPLOY_DIR}"
                """
                
                // Copy files ke deploy directory
                sh """
                    echo "Copying files to deployment directory..."
                    cp -r *.html *.css *.js *.txt ${DEPLOY_DIR}/ 2>/dev/null || true
                    echo "Deployment completed: $(date)" > ${DEPLOY_DIR}/deployment.log
                    echo "Build: ${BUILD_NUMBER}" >> ${DEPLOY_DIR}/deployment.log
                """
                
                echo "✅ Application deployed to: ${DEPLOY_DIR}"
            }
        }
        
        stage('Verify') {
            steps {
                echo '🔍 Verifying deployment...'
                sh """
                    echo "Checking deployed files in: ${DEPLOY_DIR}"
                    ls -la ${DEPLOY_DIR}/
                    
                    if [ -f "${DEPLOY_DIR}/index.html" ]; then
                        echo "✅ index.html deployed successfully"
                    else
                        echo "❌ index.html deployment failed"
                        exit 1
                    fi
                    
                    if [ -f "${DEPLOY_DIR}/style.css" ]; then
                        echo "✅ style.css deployed successfully"
                    else
                        echo "❌ style.css deployment failed"
                        exit 1
                    fi
                    
                    echo "Deployment verification completed successfully" > ${DEPLOY_DIR}/verification.txt
                """
            }
        }
    }
    
    post {
        always {
            echo '📊 Pipeline execution completed'
            // Archive important files
            archiveArtifacts artifacts: 'build-info.txt,test-results.txt,*.html,*.css,*.js', fingerprint: true
            
            // Print final directory structure
            sh 'echo "Final workspace structure:" && find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.txt"'
        }
        success {
            echo '🎉 Pipeline SUCCESS!'
            sh """
                echo "BUILD SUCCESS - ${BUILD_URL}" > build-status.txt
                echo "🎊 CI/CD DEPLOYMENT SUCCESSFUL" > ${DEPLOY_DIR}/SUCCESS.txt
                echo "Repository: Proyek_bnsp1" >> ${DEPLOY_DIR}/SUCCESS.txt
                echo "Build Number: ${BUILD_NUMBER}" >> ${DEPLOY_DIR}/SUCCESS.txt
                echo "Deployment Time: $(date)" >> ${DEPLOY_DIR}/SUCCESS.txt
                echo "Deployed to: ${DEPLOY_DIR}" >> ${DEPLOY_DIR}/SUCCESS.txt
            """
            
            // Print success message
            sh 'echo "=================================="'
            sh 'echo "🚀 CI/CD PIPELINE BERHASIL!"'
            sh 'echo "📁 Aplikasi deployed ke Jenkins container"'
            sh 'echo "📊 Check Jenkins workspace untuk hasil"'
            sh 'echo "=================================="'
        }
        failure {
            echo '❌ Pipeline FAILED!'
            sh 'echo "BUILD FAILED - Check Jenkins logs" > build-status.txt'
        }
    }
}
