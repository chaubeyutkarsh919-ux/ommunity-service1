import os
import sys
import unittest
import json

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from models import db, Career, Scholarship, CohortFeedback

class TestBackendApi(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

    def test_health(self):
        res = self.client.get('/api/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data['status'], 'ok')

    def test_upcoming_scholarships(self):
        res = self.client.get('/api/scholarships/upcoming')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(data['total_scholarships'], 8)
        self.assertTrue(any("NSP" in s['provider'] or "Ministry" in s['provider'] or "AICTE" in s['provider'] for s in data['scholarships']))

    def test_recommend_class_12_pcm(self):
        payload = {
            "class_level": "12",
            "stream": "PCM",
            "percentage": 82.0,
            "state": "Uttar Pradesh",
            "income_bracket": "1_5l_to_2_5l",
            "category": "OBC",
            "gender": "Female",
            "interests": ["building_things", "math_logic", "technology"],
            "preferred_pathway": "degree"
        }
        res = self.client.post('/api/recommend', json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        self.assertGreater(len(data['careers']), 0)
        top_career = data['careers'][0]
        self.assertIn('match_score', top_career)
        self.assertGreaterEqual(top_career['match_score'], 60)
        self.assertIn('radar_chart_data', top_career)

        # Verify female STEM student receives Pragati scholarship
        matched_scholarship_titles = [s['title'] for s in data['scholarships']]
        self.assertTrue(any("Pragati" in t or "Post-Matric" in t or "Central Sector" in t for t in matched_scholarship_titles))

    def test_recommend_class_10_vocational(self):
        payload = {
            "class_level": "10",
            "stream": "General",
            "percentage": 58.0,
            "state": "Bihar",
            "income_bracket": "below_1_5l",
            "category": "SC",
            "gender": "Male",
            "interests": ["building_things"],
            "preferred_pathway": "vocational_diploma"
        }
        res = self.client.post('/api/recommend', json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        # Class 10 should not recommend careers strictly requiring Class 12
        for c in data['careers']:
            self.assertLessEqual(c['min_class'], 10)

    def test_feedback_and_stats(self):
        fb_payload = {
            "student_class": "12th",
            "rating_clarity": 5,
            "rating_relevance": 5,
            "rating_novelty": 5,
            "discovered_new_option": True,
            "top_liked_feature": "Radar Graph & Scholarship Match",
            "comment": "Testing cohort feedback pipeline.",
            "school_location": "Govt Excellence HSS"
        }
        res = self.client.post('/api/feedback', json=fb_payload)
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertTrue(data['success'])

        # Check stats endpoint reflects feedback
        stats_res = self.client.get('/api/feedback/stats')
        self.assertEqual(stats_res.status_code, 200)
        stats_data = stats_res.get_json()
        self.assertGreater(stats_data['feedback_responses'], 0)
        self.assertGreater(stats_data['overall_satisfaction'], 3.0)

    def test_auth_endpoints(self):
        # 1. Test Demo Users Endpoint
        demo_res = self.client.get('/api/auth/demo-users')
        self.assertEqual(demo_res.status_code, 200)
        demos = demo_res.get_json()
        self.assertIn('student', demos)
        self.assertIn('counselor', demos)

        # 2. Test Student Demo Login
        login_res = self.client.post('/api/auth/login', json={
            'email_or_phone': 'student@school.edu',
            'password': 'student123'
        })
        self.assertEqual(login_res.status_code, 200)
        login_data = login_res.get_json()
        self.assertTrue(login_data['success'])
        self.assertEqual(login_data['user']['role'], 'student')
        self.assertIn('token', login_data)

        # 3. Test Invalid Password
        bad_login = self.client.post('/api/auth/login', json={
            'email_or_phone': 'student@school.edu',
            'password': 'wrongpassword'
        })
        self.assertEqual(bad_login.status_code, 401)

        # 4. Test Registration
        reg_res = self.client.post('/api/auth/register', json={
            'name': 'Pooja Patel',
            'email_or_phone': 'pooja.patel@test.edu',
            'password': 'secretpassword',
            'role': 'student',
            'school_name': 'Kasturba Vidyalaya',
            'class_level': '10th'
        })
        self.assertEqual(reg_res.status_code, 201)
        reg_data = reg_res.get_json()
        self.assertTrue(reg_data['success'])
        self.assertEqual(reg_data['user']['name'], 'Pooja Patel')

if __name__ == '__main__':
    unittest.main()

