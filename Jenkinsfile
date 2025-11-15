pipeline {
    agent any
    
    environment {
        PROJECT_NAME = 'Proyek_bnsp1'
        // Path deploy di Windows kamu (pakai quotes karena ada spasi)
        DEPLOY_DIR = '"C:\\Users\\MyBook Hype AMD\\Documents\\SIB\\deployed-app"'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔍 Checking out source code from GitHub...'
                git branch: 'main', url: 'https://github.com/cekzakyiriansyah/Proyek_bnsp1.git'
                
                // Print working directory dan list files
                bat 'echo Current directory: %CD%'
                bat 'dir'
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ Building application...'
                bat """
                    echo "Building ${PROJECT_NAME}..."
                    echo "Build started at: %DATE% %TIME%"
                    echo "Files in repository:"
                    dir /B
                """
                
                // Create build info file
                bat 'echo "Build Number: ${BUILD_NUMBER}" > build-info.txt'
                bat 'echo "Build Date: %DATE% %TIME%" >> build-info.txt'
                bat 'echo "Repository: https://github.com/cekzakyiriansyah/Proyek_bnsp1.git" >> build-info.txt'
                bat 'echo "Built by: Jenkins CI/CD" >> build-info.txt'
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running validation tests...'
                
                script {
                    // Test file existence - sesuaikan dengan file yang ada di repo kamu
                    bat '''
                        echo "Checking required files..."
                        
                        if exist index.html (
                            echo "✅ index.html found"
                        ) else (
                            echo "❌ index.html missing" && exit 1
                        )
                        
                        if exist style.css (
                            echo "✅ style.css found" 
                        ) else (
                            echo "❌ style.css missing" && exit 1
                        )
                        
                        if exist test.js (
                            echo "✅ test.js found"
                        ) else (
                            echo "⚠️ test.js not found (optional)"
                        )
                        
                        echo "All file checks completed" > test-results.txt
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                
                // Create deploy directory
                bat """
                    if not exist ${DEPLOY_DIR} (
                        mkdir ${DEPLOY_DIR}
                    )
                """
                
                // Copy semua file web ke deploy directory
                bat """
                    echo "Copying files to deployment directory..."
                    robocopy . ${DEPLOY_DIR} *.html *.css *.js *.txt *.md /E /NFL /NDL
                    
                    if %ERRORLEVEL% LEQ 3 (
                        echo "✅ Files copied successfully"
                    ) else (
                        echo "❌ File copy had issues" && exit 1
                    )
                    
                    echo "Deployment completed: %DATE% %TIME%" > ${DEPLOY_DIR}\\deployment.log
                    echo "Build: ${BUILD_NUMBER}" >> ${DEPLOY_DIR}\\deployment.log
                """
                
                echo "✅ Application deployed to: ${DEPLOY_DIR}"
            }
        }
        
        stage('Verify') {
            steps {
                echo '🔍 Verifying deployment...'
                bat """
                    echo "Checking deployed files:"
                    dir ${DEPLOY_DIR}
                    
                    if exist ${DEPLOY_DIR}\\index.html (
                        echo "✅ index.html deployed successfully"
                    ) else (
                        echo "❌ index.html deployment failed" && exit 1
                    )
                    
                    if exist ${DEPLOY_DIR}\\style.css (
                        echo "✅ style.css deployed successfully"
                    ) else (
                        echo "❌ style.css deployment failed" && exit 1
                    )
                    
                    echo "Deployment verification completed successfully" > ${DEPLOY_DIR}\\verification.txt
                """
            }
        }
    }
    
    post {
        always {
            echo '📊 Pipeline execution completed'
            // Archive build artifacts
            archiveArtifacts artifacts: 'build-info.txt,test-results.txt,*.html,*.css,*.js', fingerprint: true
        }
        success {
            echo '🎉 Pipeline SUCCESS!'
            bat 'echo "BUILD SUCCESS - ${BUILD_URL}" > build-status.txt'
            
            // Create success flag di deploy directory
            bat """
                echo "🎊 CI/CD DEPLOYMENT SUCCESSFUL" > ${DEPLOY_DIR}\\SUCCESS.txt
                echo "Repository: Proyek_bnsp1" >> ${DEPLOY_DIR}\\SUCCESS.txt
                echo "Build Number: ${BUILD_NUMBER}" >> ${DEPLOY_DIR}\\SUCCESS.txt  
                echo "Deployment Time: %DATE% %TIME%" >> ${DEPLOY_DIR}\\SUCCESS.txt
                echo "Deployed to: ${DEPLOY_DIR}" >> ${DEPLOY_DIR}\\SUCCESS.txt
            """
            
            // Print success message
            bat 'echo "=================================="'
            bat 'echo "🚀 CI/CD PIPELINE BERHASIL!"'
            bat 'echo "📁 Aplikasi deployed ke: ${DEPLOY_DIR}"'
            bat 'echo "🔗 Buka index.html di browser"'
            bat 'echo "=================================="'
        }
        failure {
            echo '❌ Pipeline FAILED!'
            bat 'echo "BUILD FAILED - Check Jenkins logs" > build-status.txt'
        }
    }
}