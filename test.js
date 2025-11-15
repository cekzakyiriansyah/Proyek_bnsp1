// Simple test functions untuk demo CI/CD
function runTests() {
    console.log('🚀 Running automated tests...');
    
    // Test 1: Cek apakah element penting ada
    const header = document.querySelector('h1');
    if (header && header.textContent.includes('CI/CD')) {
        console.log('✅ Test 1 passed: Header check');
    } else {
        console.log('❌ Test 1 failed: Header not found');
        return false;
    }
    
    // Test 2: Cek build status element
    const buildStatus = document.getElementById('build-status');
    if (buildStatus) {
        console.log('✅ Test 2 passed: Build status element found');
    } else {
        console.log('❌ Test 2 failed: Build status element not found');
        return false;
    }
    
    // Test 3: Simulasi function checkStatus
    if (typeof checkStatus === 'function') {
        console.log('✅ Test 3 passed: checkStatus function exists');
    } else {
        console.log('❌ Test 3 failed: checkStatus function not found');
        return false;
    }
    
    console.log('🎉 All tests passed!');
    return true;
}

// Function untuk update status di UI
function checkStatus() {
    const statusElement = document.getElementById('build-status');
    statusElement.textContent = '✅ Build Successful';
    statusElement.className = 'status-success';
    
    // Update deploy time
    const now = new Date();
    document.getElementById('deploy-time').textContent = now.toLocaleString();
    
    // Run automated tests
    const testsPassed = runTests();
    
    if (testsPassed) {
        console.log('🎊 Application deployed successfully!');
    }
}

// Initialize ketika page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 CI/CD Application initialized');
    
    // Set initial deploy time
    document.getElementById('deploy-time').textContent = new Date().toLocaleString();
    
    // Auto-check status setelah 2 detik
    setTimeout(() => {
        const statusElement = document.getElementById('build-status');
        statusElement.textContent = '✅ System Ready';
        statusElement.className = 'status-success';
    }, 2000);
});

// Export functions untuk testing (jika pakai test framework)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests, checkStatus };
}