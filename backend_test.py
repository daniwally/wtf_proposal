#!/usr/bin/env python3
import requests
import sys
import json
from datetime import datetime

class WineProposalAPITester:
    def __init__(self, base_url="https://wine-brand-brasil.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.errors = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {name}")
        if details:
            print(f"   {details}")
        if success:
            self.tests_passed += 1
        else:
            self.errors.append(f"{name}: {details}")
        print()

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            data = response.json() if success else {}
            
            expected_message = "WTF Agency Proposal API"
            message_correct = data.get('message') == expected_message
            
            self.log_test(
                "API Root Endpoint", 
                success and message_correct,
                f"Status: {response.status_code}, Message: {data.get('message', 'None')}"
            )
            return success and message_correct
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_contact_creation(self):
        """Test contact form submission"""
        contact_data = {
            "nombre": "Test User",
            "empresa": "Test Company",
            "email": "test@example.com",
            "mensaje": "Test message for wine brand proposal"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=contact_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            data = response.json() if success else {}
            
            # Validate response structure
            required_fields = ['id', 'nombre', 'empresa', 'email', 'timestamp']
            fields_present = all(field in data for field in required_fields) if success else False
            
            # Validate data integrity
            data_correct = True
            if success and fields_present:
                data_correct = (
                    data['nombre'] == contact_data['nombre'] and
                    data['empresa'] == contact_data['empresa'] and
                    data['email'] == contact_data['email'] and
                    data['mensaje'] == contact_data['mensaje']
                )
            
            overall_success = success and fields_present and data_correct
            
            self.log_test(
                "Contact Form Submission", 
                overall_success,
                f"Status: {response.status_code}, Fields: {fields_present}, Data: {data_correct}"
            )
            
            return data.get('id') if overall_success else None
            
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
            return None

    def test_contact_validation(self):
        """Test contact form validation (missing required fields)"""
        # Test missing nombre
        invalid_data = {
            "empresa": "Test Company", 
            "email": "test@example.com"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return error (422 for validation error)
            success = response.status_code == 422
            
            self.log_test(
                "Contact Form Validation (Missing Fields)",
                success,
                f"Status: {response.status_code} (expected 422)"
            )
            return success
            
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Exception: {str(e)}")
            return False

    def test_get_contacts(self):
        """Test retrieving contacts"""
        try:
            response = requests.get(f"{self.api_url}/contacts", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                is_list = isinstance(data, list)
                
                self.log_test(
                    "Get Contacts Endpoint",
                    is_list,
                    f"Status: {response.status_code}, Returns list: {is_list}, Count: {len(data) if is_list else 0}"
                )
                return is_list
            else:
                self.log_test("Get Contacts Endpoint", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Get Contacts Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test create status
        status_data = {"client_name": "Grupo Upper Blanc"}
        
        try:
            response = requests.post(
                f"{self.api_url}/status",
                json=status_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            create_success = response.status_code == 200
            data = response.json() if create_success else {}
            
            self.log_test(
                "Create Status Check",
                create_success,
                f"Status: {response.status_code}"
            )
            
            # Test get status
            response = requests.get(f"{self.api_url}/status", timeout=10)
            get_success = response.status_code == 200
            
            self.log_test(
                "Get Status Checks",
                get_success,
                f"Status: {response.status_code}"
            )
            
            return create_success and get_success
            
        except Exception as e:
            self.log_test("Status Endpoints", False, f"Exception: {str(e)}")
            return False

    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            response = requests.options(f"{self.api_url}/contact", timeout=10)
            
            # Check for CORS headers
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods', 
                'Access-Control-Allow-Headers'
            ]
            
            headers_present = all(header in response.headers for header in cors_headers)
            
            self.log_test(
                "CORS Configuration",
                headers_present,
                f"Status: {response.status_code}, CORS headers present: {headers_present}"
            )
            
            return headers_present
            
        except Exception as e:
            self.log_test("CORS Configuration", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Wine Brand Proposal API Tests")
        print(f"🔗 Testing API: {self.api_url}")
        print("=" * 60)
        
        # Run individual tests
        self.test_api_root()
        contact_id = self.test_contact_creation()
        self.test_contact_validation()
        self.test_get_contacts()
        self.test_status_endpoints()
        self.test_cors_headers()
        
        # Print summary
        print("=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"   Tests Run: {self.tests_run}")
        print(f"   Tests Passed: {self.tests_passed}")
        print(f"   Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.errors:
            print("\n❌ FAILED TESTS:")
            for error in self.errors:
                print(f"   - {error}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = WineProposalAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())