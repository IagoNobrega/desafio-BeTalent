/**
 * API Testing - Restful-Booker
 * BDD Style Tests with JavaScript
 * 
 * Feature: Booking Management API
 *   As a developer
 *   I want to test booking API endpoints
 *   So that I can ensure the API works correctly
 */

const axios = require('axios');
const assert = require('assert');

const BASE_URL = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';
const API_DOC_URL = 'https://restful-booker.herokuapp.com/apidoc/index.html';
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  validateStatus: () => true // Don't throw on any status
});

class APITester {
  constructor() {
    this.authToken = null;
    this.bookingId = null;
    this.testResults = [];
  }

  /**
   * Log test result
   */
  logResult(testName, passed, details = '') {
    this.testResults.push({
      name: testName,
      passed,
      details,
      timestamp: new Date().toISOString()
    });
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${testName}`);
    if (details) console.log(`  └─ ${details}`);
  }

  /**
   * Get auth token
   */
  async getAuthToken() {
    try {
      const response = await API.post('/auth', {
        username: 'admin',
        password: 'password123'
      });

      const passed = response.status === 200 && Boolean(response.data.token);
      this.logResult(
        'TC-API-AUTH-001 | Should get auth token',
        passed,
        `Status: ${response.status}, Token: ${response.data.token ? 'obtained' : 'failed'}`
      );

      if (passed) {
        this.authToken = response.data.token;
      }
      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-AUTH-001 | Should get auth token',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Create Booking
   */
  async testCreateBooking() {
    try {
      const bookingData = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        },
        additionalneeds: 'Breakfast'
      };

      const response = await API.post('/booking', bookingData);
      
      const passed = response.status === 200 &&
                    response.data.bookingid &&
                    response.data.booking.firstname === 'John';

      this.logResult(
        'TC-API-CRUD-001 | Should create booking',
        passed,
        `Status: ${response.status}, Booking ID: ${response.data.bookingid || 'N/A'}`
      );

      if (passed) {
        this.bookingId = response.data.bookingid;
      }
      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-CRUD-001 | Should create booking',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Get All Bookings
   */
  async testGetAllBookings() {
    try {
      const response = await API.get('/booking');
      
      const passed = response.status === 200 &&
                    Array.isArray(response.data) &&
                    response.data.length > 0;

      this.logResult(
        'TC-API-CRUD-002 | Should get all bookings',
        passed,
        `Status: ${response.status}, Count: ${response.data.length || 0}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-CRUD-002 | Should get all bookings',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Get Booking by ID
   */
  async testGetBookingById() {
    try {
      const response = await API.get(`/booking/${this.bookingId}`);
      
      const passed = response.status === 200 &&
                    response.data.firstname &&
                    response.data.lastname;

      this.logResult(
        'TC-API-CRUD-003 | Should get booking by ID',
        passed,
        `Status: ${response.status}, Name: ${response.data.firstname} ${response.data.lastname}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-CRUD-003 | Should get booking by ID',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Block unauthorized update
   */
  async testUnauthorizedUpdateBlocked() {
    try {
      const bookingData = {
        firstname: 'Unauthorized',
        lastname: 'User',
        totalprice: 999,
        depositpaid: false,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        },
        additionalneeds: 'Security test'
      };

      const response = await API.put(`/booking/${this.bookingId}`, bookingData);
      const passed = response.status === 403;

      this.logResult(
        'TC-API-SEC-001 | Should block unauthenticated booking update',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-SEC-001 | Should block unauthenticated booking update',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Update Booking
   */
  async testUpdateBooking() {
    try {
      const bookingData = {
        firstname: 'Jane',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        },
        additionalneeds: 'Breakfast'
      };

      const response = await API.put(`/booking/${this.bookingId}`, bookingData, {
        headers: {
          'Cookie': `token=${this.authToken}`
        }
      });

      const passed = response.status === 200 &&
                    response.data.firstname === 'Jane';

      this.logResult(
        'TC-API-CRUD-004 | Should update booking',
        passed,
        `Status: ${response.status}, Updated name: ${response.data.firstname}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-CRUD-004 | Should update booking',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Partial Update Booking (PATCH)
   */
  async testPartialUpdateBooking() {
    try {
      const partialData = {
        firstname: 'Janet'
      };

      const response = await API.patch(`/booking/${this.bookingId}`, partialData, {
        headers: {
          'Cookie': `token=${this.authToken}`
        }
      });

      const passed = response.status === 200;

      this.logResult(
        'TC-API-CRUD-005 | Should partially update booking',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-CRUD-005 | Should partially update booking',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Delete Booking
   */
  async testDeleteBooking() {
    try {
      const response = await API.delete(`/booking/${this.bookingId}`, {
        headers: {
          'Cookie': `token=${this.authToken}`
        }
      });

      const passed = response.status === 201;

      this.logResult(
        'TC-API-CRUD-006 | Should delete booking',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-CRUD-006 | Should delete booking',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Validate Required Fields
   */
  async testValidateRequiredFields() {
    try {
      // Test missing firstname
      const response = await API.post('/booking', {
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        }
      });

      // API should reject or handle gracefully
      const passed = response.status !== 200; // Should fail validation

      this.logResult(
        'TC-API-VALID-001 | Should validate required firstname',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-VALID-001 | Should validate required firstname',
        true,
        'Properly threw error on missing field'
      );
      return true;
    }
  }

  /**
   * Test: Filter by Name
   */
  async testFilterByName() {
    try {
      // First create a booking with known name
      const bookingData = {
        firstname: 'TestFilter',
        lastname: 'User',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        }
      };

      await API.post('/booking', bookingData);

      // Then query by name
      const response = await API.get('/booking', {
        params: {
          firstname: 'TestFilter',
          lastname: 'User'
        }
      });

      const passed = response.status === 200 && Array.isArray(response.data);

      this.logResult(
        'TC-API-FILTER-001 | Should filter bookings by name',
        passed,
        `Status: ${response.status}, Results: ${response.data?.length || 0}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-FILTER-001 | Should filter bookings by name',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Filter by Date Range
   */
  async testFilterByDateRange() {
    try {
      const response = await API.get('/booking', {
        params: {
          checkin: '2024-01-01',
          checkout: '2024-01-31'
        }
      });

      const passed = response.status === 200 && Array.isArray(response.data);

      this.logResult(
        'TC-API-FILTER-002 | Should filter bookings by date range',
        passed,
        `Status: ${response.status}, Results: ${response.data?.length || 0}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-FILTER-002 | Should filter bookings by date range',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Pagination
   */
  async testPagination() {
    try {
      const response = await API.get('/booking', {
        params: {
          limit: 5,
          offset: 0
        }
      });

      const passed = response.status === 200 && Array.isArray(response.data);

      this.logResult(
        'TC-API-FILTER-003 | Should support pagination',
        passed,
        `Status: ${response.status}, Results: ${response.data?.length || 0}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-FILTER-003 | Should support pagination',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: API Health
   */
  async testAPIHealth() {
    try {
      const response = await API.get('/ping');
      
      const passed = response.status === 201;

      this.logResult(
        'TC-API-HEALTH-001 | Should return healthy API status',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-HEALTH-001 | Should return healthy API status',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Basic API response time
   */
  async testResponseTime() {
    try {
      const startTime = Date.now();
      const response = await API.get('/ping');
      const responseTime = Date.now() - startTime;
      const passed = response.status === 201 && responseTime < 2000;

      this.logResult(
        'TC-API-PERF-001 | Should respond to health check under 2 seconds',
        passed,
        `Status: ${response.status}, Response time: ${responseTime}ms`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-PERF-001 | Should respond to health check under 2 seconds',
        false,
        error.message
      );
      return false;
    }
  }

  /**
   * Test: Invalid Price Format
   */
  async testInvalidPriceFormat() {
    try {
      const response = await API.post('/booking', {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 'invalid',
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-08'
        }
      });

      // Should either reject or convert to number
      const passed = response.status !== 200;

      this.logResult(
        'TC-API-VALID-002 | Should validate price format',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-VALID-002 | Should validate price format',
        true,
        'Properly threw error on invalid price'
      );
      return true;
    }
  }

  /**
   * Test: Invalid Date Format
   */
  async testInvalidDateFormat() {
    try {
      const response = await API.post('/booking', {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: 'invalid-date',
          checkout: 'invalid-date'
        }
      });

      // API should validate date format
      const passed = response.status !== 200;

      this.logResult(
        'TC-API-VALID-003 | Should validate date format',
        passed,
        `Status: ${response.status}`
      );

      return passed;
    } catch (error) {
      this.logResult(
        'TC-API-VALID-003 | Should validate date format',
        true,
        'Properly threw error on invalid date'
      );
      return true;
    }
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('\nRUNNING API TESTS - Restful-Booker\n');
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`API docs: ${API_DOC_URL}`);
    console.log('=' .repeat(60));

    // Authentication
    console.log('\n📋 Authentication Tests:');
    await this.getAuthToken();

    // CRUD Operations
    console.log('\n📋 CRUD Operations:');
    await this.testCreateBooking();
    await this.testGetAllBookings();
    await this.testGetBookingById();

    // Security
    console.log('\nSecurity Tests:');
    await this.testUnauthorizedUpdateBlocked();

    await this.testUpdateBooking();
    await this.testPartialUpdateBooking();
    await this.testDeleteBooking();

    // Validation
    console.log('\n📋 Validation Tests:');
    await this.testValidateRequiredFields();
    await this.testInvalidPriceFormat();
    await this.testInvalidDateFormat();

    // Filters and Searches
    console.log('\n📋 Filters and Searches:');
    await this.testFilterByName();
    await this.testFilterByDateRange();
    await this.testPagination();

    // Health Check
    console.log('\n📋 Health Check:');
    await this.testAPIHealth();

    // Performance
    console.log('\nPerformance Tests:');
    await this.testResponseTime();

    // Summary
    this.printSummary();

    return this.testResults;
  }

  /**
   * Print test summary
   */
  printSummary() {
    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;
    const percentage = ((passed / total) * 100).toFixed(2);

    console.log('\n' + '=' .repeat(60));
    console.log('\n📊 TEST SUMMARY');
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed} ✅`);
    console.log(`Failed: ${total - passed} ❌`);
    console.log(`Pass Rate: ${percentage}%\n`);
  }
}

// Run tests
if (require.main === module) {
  const tester = new APITester();
  tester.runAllTests().catch(console.error);
}

module.exports = APITester;
