pipeline {
    agent any
    
    stages {
        stage('Checkout & List Files') {
            steps {
                echo '🔍 Checking out source code...'
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Validate Files') {
            steps {
                echo '📁 Validating required files...'
                sh '''
                    echo "Checking files in repository:"
                    ls -la
                    
                    if [ -f "index.html" ]; then
                        echo "✅ SUCCESS: index.html found"
                    else
                        echo "❌ ERROR: index.html missing"
                        exit 1
                    fi
                    
                    if [ -f "style.css" ]; then
                        echo "✅ SUCCESS: style.css found"
                    else
                        echo "❌ ERROR: style.css missing" 
                        exit 1
                    fi
                    
                    echo "All required files present!" > validation.txt
                '''
            }
        }
        
        stage('Simple Build') {
            steps {
                echo '🏗️ Building application...'
                sh '''
                    echo "Build started at: $(date)" > build-info.txt
                    echo "This is a simple build step" >> build-info.txt
                    cat build-info.txt
                '''
            }
        }
        
        stage('Simple Deploy') {
            steps {
                echo '🚀 Deploying application...'
                sh '''
                    mkdir -p deployed
                    cp *.html *.css *.js *.txt deployed/ 2>/dev/null || true
                    echo "Files deployed to ./deployed folder" > deployed/deploy-status.txt
                    echo "Deployed files:"
                    ls -la deployed/
                '''
            }
        }
    }
    
    post {
        always {
            echo '📊 Pipeline execution completed'
            archiveArtifacts artifacts: '*.txt,*.html,*.css,*.js', fingerprint: true
        }
        success {
            echo '🎉 Pipeline SUCCESS!'
            sh 'echo "BUILD SUCCESS" > build-result.txt'
        }
        failure {
            echo '❌ Pipeline FAILED!'
            sh 'echo "BUILD FAILED" > build-result.txt'
        }
    }
}
