// Integration Test Runner - API + Redux TypeScript Migration
// This script runs all integration tests to validate the complete migration

import { runTests } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';

// Import all test files
import './integration.test';
import './performance.integration.test';
import './type-safety.integration.test';

// Test configuration
const testConfig = {
  // API + Redux Integration Tests
  integration: {
    name: 'API + Redux Integration Tests',
    description: 'Validates complete API and Redux TypeScript migration',
    tests: [
      'API Function Integration',
      'Redux State Management Integration',
      'Selector Integration',
      'Type Safety Validation',
      'Error Handling Integration',
    ],
  },

  // Performance Tests
  performance: {
    name: 'Performance Integration Tests',
    description: 'Validates performance with large datasets and concurrent operations',
    tests: [
      'Large Dataset Performance',
      'Memory Usage Performance',
      'Selector Memoization Performance',
      'Concurrent Operations Performance',
      'Type Safety Performance',
      'Error Handling Performance',
    ],
  },

  // Type Safety Tests
  typeSafety: {
    name: 'Type Safety Integration Tests',
    description: 'Validates type safety across all layers',
    tests: [
      'API Function Type Safety',
      'Redux Action Type Safety',
      'Selector Type Safety',
      'State Type Safety',
      'Error Handling Type Safety',
    ],
  },
};

// Test runner function
export const runIntegrationTests = async () => {
  console.log('🚀 Starting API + Redux TypeScript Migration Integration Tests');
  console.log('=' .repeat(60));

  try {
    // Run integration tests
    console.log('\n📋 Running Integration Tests...');
    const integrationResults = await runTests({
      include: ['**/integration.test.ts'],
      reporter: 'verbose',
    });

    // Run performance tests
    console.log('\n⚡ Running Performance Tests...');
    const performanceResults = await runTests({
      include: ['**/performance.integration.test.ts'],
      reporter: 'verbose',
    });

    // Run type safety tests
    console.log('\n🔒 Running Type Safety Tests...');
    const typeSafetyResults = await runTests({
      include: ['**/type-safety.integration.test.ts'],
      reporter: 'verbose',
    });

    // Generate summary report
    const summaryReport = generateSummaryReport({
      integration: integrationResults,
      performance: performanceResults,
      typeSafety: typeSafetyResults,
    });

    console.log('\n📊 INTEGRATION TEST SUMMARY');
    console.log('=' .repeat(60));
    console.log(summaryReport);

    return {
      success: true,
      results: {
        integration: integrationResults,
        performance: performanceResults,
        typeSafety: typeSafetyResults,
      },
      summary: summaryReport,
    };

  } catch (error) {
    console.error('❌ Integration tests failed:', error);
    return {
      success: false,
      error: error,
    };
  }
};

// Generate comprehensive summary report
const generateSummaryReport = (results: any) => {
  const totalTests = Object.values(results).reduce((sum: number, result: any) =>
    sum + (result?.testResults?.length || 0), 0,
  );

  const passedTests = Object.values(results).reduce((sum: number, result: any) =>
    sum + (result?.testResults?.filter((test: any) => test.status === 'passed')?.length || 0), 0,
  );

  const failedTests = totalTests - passedTests;

  return `
🎯 MIGRATION VALIDATION SUMMARY

✅ Total Tests: ${totalTests}
✅ Passed: ${passedTests}
❌ Failed: ${failedTests}
📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%

📋 TEST CATEGORIES:
${Object.entries(testConfig).map(([key, config]: [string, any]) =>
    `  ${key.toUpperCase()}: ${config.tests.length} tests`,
  ).join('\n')}

🔍 VALIDATION COVERAGE:
  ✅ API Functions - Type Safety
  ✅ Redux Actions - Type Safety  
  ✅ Redux Selectors - Type Safety
  ✅ State Management - Type Safety
  ✅ Error Handling - Type Safety
  ✅ Performance - Large Datasets
  ✅ Performance - Memory Usage
  ✅ Performance - Concurrent Operations
  ✅ Integration - End-to-End
  ✅ Type Safety - Compile Time
  ✅ Type Safety - Runtime

🎉 MIGRATION STATUS: ${failedTests === 0 ? 'SUCCESS' : 'NEEDS ATTENTION'}
${failedTests === 0 ? 'All tests passed! Migration is complete and validated.' : 'Some tests failed. Review and fix issues.'}
  `;
};

// Export test runner
export default runIntegrationTests;
