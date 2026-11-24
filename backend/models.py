import json
from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Career(db.Model):
    __tablename__ = 'careers'

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    short_description = db.Column(db.Text, nullable=False)
    min_class = db.Column(db.Integer, default=10)  # 10 or 12
    eligible_streams = db.Column(db.Text, default='["Any"]')  # JSON list
    min_percentage = db.Column(db.Float, default=45.0)
    duration_years = db.Column(db.String(80), nullable=False)
    entry_salary_range = db.Column(db.String(80), nullable=False)
    roadmap_steps = db.Column(db.Text, default='[]')  # JSON list of dicts
    aptitude_vector = db.Column(db.Text, default='{}')  # JSON dict
    tags = db.Column(db.Text, default='[]')  # JSON list of tags
    is_vocational = db.Column(db.Boolean, default=False)
    job_growth = db.Column(db.String(40), default='High')
    key_skills = db.Column(db.Text, default='[]')  # JSON list
    work_environment = db.Column(db.String(120), default='Office / Field / Lab')
    icon_name = db.Column(db.String(60), default='Briefcase')

    @property
    def streams_list(self):
        try:
            return json.loads(self.eligible_streams) if self.eligible_streams else []
        except Exception:
            return []

    @property
    def tags_list(self):
        try:
            return json.loads(self.tags) if self.tags else []
        except Exception:
            return []

    @property
    def aptitude_dict(self):
        try:
            return json.loads(self.aptitude_vector) if self.aptitude_vector else {}
        except Exception:
            return {}

    @property
    def roadmap_list(self):
        try:
            return json.loads(self.roadmap_steps) if self.roadmap_steps else []
        except Exception:
            return []

    @property
    def skills_list(self):
        try:
            return json.loads(self.key_skills) if self.key_skills else []
        except Exception:
            return []

    def to_dict(self):
        return {
            'id': self.id,
            'slug': self.slug,
            'title': self.title,
            'category': self.category,
            'short_description': self.short_description,
            'min_class': self.min_class,
            'eligible_streams': self.streams_list,
            'min_percentage': self.min_percentage,
            'duration_years': self.duration_years,
            'entry_salary_range': self.entry_salary_range,
            'roadmap_steps': self.roadmap_list,
            'aptitude_vector': self.aptitude_dict,
            'tags': self.tags_list,
            'is_vocational': self.is_vocational,
            'job_growth': self.job_growth,
            'key_skills': self.skills_list,
            'work_environment': self.work_environment,
            'icon_name': self.icon_name
        }


class Scholarship(db.Model):
    __tablename__ = 'scholarships'

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    provider = db.Column(db.String(120), nullable=False)
    short_description = db.Column(db.Text, nullable=False)
    min_class = db.Column(db.Integer, default=10)
    eligible_streams = db.Column(db.Text, default='["All"]')  # JSON list
    min_percentage = db.Column(db.Float, default=50.0)
    max_income_limit = db.Column(db.Float, default=0.0)  # 0 means no income cap
    gender_eligibility = db.Column(db.String(30), default='All')  # 'All', 'Girls Only', 'Boys Only'
    category_eligibility = db.Column(db.Text, default='["All"]')  # JSON list
    benefit_amount = db.Column(db.String(100), nullable=False)
    benefit_numeric = db.Column(db.Integer, default=0)
    deadline_date = db.Column(db.String(40), nullable=False)
    portal_url = db.Column(db.String(250), nullable=False)
    documents_needed = db.Column(db.Text, default='[]')
    tags = db.Column(db.Text, default='[]')

    @property
    def streams_list(self):
        try:
            return json.loads(self.eligible_streams) if self.eligible_streams else []
        except Exception:
            return []

    @property
    def categories_list(self):
        try:
            return json.loads(self.category_eligibility) if self.category_eligibility else []
        except Exception:
            return []

    @property
    def documents_list(self):
        try:
            return json.loads(self.documents_needed) if self.documents_needed else []
        except Exception:
            return []

    @property
    def tags_list(self):
        try:
            return json.loads(self.tags) if self.tags else []
        except Exception:
            return []

    def to_dict(self):
        return {
            'id': self.id,
            'slug': self.slug,
            'title': self.title,
            'provider': self.provider,
            'short_description': self.short_description,
            'min_class': self.min_class,
            'eligible_streams': self.streams_list,
            'min_percentage': self.min_percentage,
            'max_income_limit': self.max_income_limit,
            'gender_eligibility': self.gender_eligibility,
            'category_eligibility': self.categories_list,
            'benefit_amount': self.benefit_amount,
            'benefit_numeric': self.benefit_numeric,
            'deadline_date': self.deadline_date,
            'portal_url': self.portal_url,
            'documents_needed': self.documents_list,
            'tags': self.tags_list
        }


class CohortFeedback(db.Model):
    __tablename__ = 'cohort_feedback'

    id = db.Column(db.Integer, primary_key=True)
    student_class = db.Column(db.String(20), default='12th')
    rating_clarity = db.Column(db.Integer, nullable=False, default=5)
    rating_relevance = db.Column(db.Integer, nullable=False, default=5)
    rating_novelty = db.Column(db.Integer, nullable=False, default=5)
    discovered_new_option = db.Column(db.Boolean, default=True)
    top_liked_feature = db.Column(db.String(100), default='Clear Roadmap')
    comment = db.Column(db.Text, default='')
    school_location = db.Column(db.String(100), default='Govt / Low-Cost Private School')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'student_class': self.student_class,
            'rating_clarity': self.rating_clarity,
            'rating_relevance': self.rating_relevance,
            'rating_novelty': self.rating_novelty,
            'average_rating': round((self.rating_clarity + self.rating_relevance + self.rating_novelty) / 3.0, 1),
            'discovered_new_option': self.discovered_new_option,
            'top_liked_feature': self.top_liked_feature,
            'comment': self.comment,
            'school_location': self.school_location,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class AssessmentHistory(db.Model):
    __tablename__ = 'assessment_history'

    id = db.Column(db.Integer, primary_key=True)
    class_level = db.Column(db.String(20))
    stream = db.Column(db.String(40))
    percentage = db.Column(db.Float)
    state = db.Column(db.String(80))
    income_bracket = db.Column(db.String(60))
    category = db.Column(db.String(40))
    gender = db.Column(db.String(20))
    selected_interests = db.Column(db.Text, default='[]')
    matched_career_ids = db.Column(db.Text, default='[]')
    matched_scholarship_ids = db.Column(db.Text, default='[]')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email_or_phone = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(40), default='student')  # 'student', 'counselor', 'admin'
    school_name = db.Column(db.String(150), default='')
    class_level = db.Column(db.String(20), default='12th')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email_or_phone': self.email_or_phone,
            'role': self.role,
            'school_name': self.school_name,
            'class_level': self.class_level,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

