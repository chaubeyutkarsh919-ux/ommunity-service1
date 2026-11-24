import math
from datetime import datetime

# Stream compatibility mapping
STREAM_MAP = {
    "PCM": ["PCM", "SCIENCE", "GENERAL", "ANY", "ALL", "VOCATIONAL"],
    "PCB": ["PCB", "SCIENCE", "GENERAL", "ANY", "ALL"],
    "COMMERCE": ["COMMERCE", "GENERAL", "ANY", "ALL"],
    "ARTS": ["ARTS", "HUMANITIES", "GENERAL", "ANY", "ALL"],
    "GENERAL": ["GENERAL", "ANY", "ALL", "VOCATIONAL"],
    "VOCATIONAL": ["VOCATIONAL", "GENERAL", "ANY", "ALL"]
}

# Income bracket mapping to upper estimates (in INR)
INCOME_ESTIMATES = {
    "below_1_5l": 150000,
    "1_5l_to_2_5l": 250000,
    "2_5l_to_4_5l": 450000,
    "4_5l_to_6l": 600000,
    "above_6l": 900000,
    "any": 500000
}

# Interest tag to aptitude dimensional impact
TAG_TO_DIMENSIONS = {
    "building_things": {"practical": 3.5, "discipline": 1.5, "analytical": 1.0},
    "math_logic": {"analytical": 3.5, "technology": 2.0, "enterprise": 1.0},
    "technology": {"analytical": 2.5, "practical": 2.5, "creative": 1.5},
    "healthcare_helping": {"social": 3.5, "discipline": 2.0, "practical": 1.5},
    "creative_design": {"creative": 4.0, "practical": 1.5, "social": 1.0},
    "business_money": {"enterprise": 3.5, "analytical": 2.0, "social": 1.5},
    "discipline_defense": {"discipline": 4.0, "practical": 2.5, "social": 1.0},
    "public_service": {"social": 3.0, "discipline": 2.5, "enterprise": 1.5},
    "law_governance": {"social": 2.5, "analytical": 2.5, "enterprise": 2.5}
}

RADAR_DIMENSIONS = ["analytical", "practical", "creative", "social", "enterprise", "discipline"]
DIMENSION_LABELS = {
    "analytical": "Logic & Math",
    "practical": "Hands-on / Tools",
    "creative": "Creative & Design",
    "social": "People & Care",
    "enterprise": "Business & Trade",
    "discipline": "Focus & Routine"
}


def compute_student_aptitude_vector(selected_tags):
    """
    Computes a normalized 1-10 aptitude vector for the student
    based on selected interest tags.
    """
    base_scores = {dim: 4.0 for dim in RADAR_DIMENSIONS}  # healthy baseline

    if not selected_tags:
        return {dim: 5.0 for dim in RADAR_DIMENSIONS}

    for tag in selected_tags:
        impacts = TAG_TO_DIMENSIONS.get(tag, {})
        for dim, weight in impacts.items():
            if dim in base_scores:
                base_scores[dim] += weight

    # Normalize to 2.0 - 9.5 scale
    result = {}
    for dim in RADAR_DIMENSIONS:
        val = min(9.5, max(2.0, round(base_scores[dim], 1)))
        result[dim] = val
    return result


def jaccard_similarity(set_a, set_b):
    if not set_a or not set_b:
        return 0.2
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union > 0 else 0.0


def vector_proximity(vec_a, vec_b):
    """
    Calculates similarity between two 6-dimension vectors (0 to 1).
    """
    total_diff = 0.0
    for dim in RADAR_DIMENSIONS:
        val_a = vec_a.get(dim, 5.0)
        val_b = vec_b.get(dim, 5.0)
        total_diff += abs(val_a - val_b)
    # Maximum theoretical diff is 6 * 10 = 60
    proximity = 1.0 - (total_diff / 50.0)
    return max(0.1, min(1.0, proximity))


def parse_class_level(val, default=12):
    try:
        if isinstance(val, (int, float)):
            return int(val)
        if isinstance(val, str):
            cleaned = val.lower().replace('th', '').replace('class', '').strip()
            return int(cleaned)
        return default
    except (ValueError, TypeError):
        return default


def safe_float(val, default=65.0):
    try:
        if isinstance(val, (int, float)):
            return float(val)
        if isinstance(val, str):
            cleaned = val.replace('%', '').strip()
            return float(cleaned)
        return default
    except (ValueError, TypeError):
        return default


def evaluate_careers(careers, student_profile):
    """
    Filters and ranks career paths based on hard constraints and soft interest alignment.
    """
    s_class = parse_class_level(student_profile.get("class_level", 12))
    s_stream = str(student_profile.get("stream", "PCM")).upper().strip()
    s_percentage = safe_float(student_profile.get("percentage", 65.0))
    s_interests = set(student_profile.get("interests", []))
    s_pathway_pref = student_profile.get("preferred_pathway", "any")  # 'vocational_diploma', 'degree', 'defense', 'direct_job', 'any'

    student_aptitude = compute_student_aptitude_vector(list(s_interests))
    allowed_streams = STREAM_MAP.get(s_stream, ["ANY", "GENERAL", "ALL"])

    scored_careers = []

    for career in careers:
        # 1. Hard Constraints Check
        min_class = career.min_class if hasattr(career, 'min_class') else career.get('min_class', 10)
        if min_class > s_class:
            continue

        # Check Stream eligibility
        raw_streams = career.streams_list if hasattr(career, 'streams_list') else career.get('eligible_streams', [])
        c_streams = [s.upper() for s in raw_streams]
        stream_matched = any(
            stream in c_streams or "ANY" in c_streams or "ALL" in c_streams
            for stream in allowed_streams
        )
        if not stream_matched:
            continue

        # Check Cutoff Percentage (with a friendly 3% grace margin for low-resource students)
        min_pct = career.min_percentage if hasattr(career, 'min_percentage') else career.get('min_percentage', 45.0)
        if s_percentage < (min_pct - 3.0):
            continue

        # 2. Soft Constraints & Affinity Scoring
        raw_tags = career.tags_list if hasattr(career, 'tags_list') else career.get('tags', [])
        c_tags = set(raw_tags)
        jaccard_score = jaccard_similarity(s_interests, c_tags)

        # Compare aptitude vectors
        c_vector = career.aptitude_dict if hasattr(career, 'aptitude_dict') else career.get('aptitude_vector', {})
        proximity_score = vector_proximity(student_aptitude, c_vector)

        # Academic headroom bonus
        headroom = s_percentage - min_pct
        academic_bonus = min(12.0, max(0.0, headroom * 0.4))

        # Practical pathway preference bonus
        is_vocational = career.is_vocational if hasattr(career, 'is_vocational') else career.get('is_vocational', False)
        category_name = career.category if hasattr(career, 'category') else career.get('category', '')

        preference_bonus = 0.0
        if s_pathway_pref == "vocational_diploma" and is_vocational:
            preference_bonus = 12.0
        elif s_pathway_pref == "defense" and ("defense" in category_name.lower() or "uniform" in category_name.lower()):
            preference_bonus = 15.0
        elif s_pathway_pref == "degree" and not is_vocational:
            preference_bonus = 10.0
        elif s_pathway_pref == "direct_job" and is_vocational:
            preference_bonus = 8.0

        # Calculate combined match percentage (45% tags, 35% aptitude, 10% academic, 10% preference)
        raw_score = (
            (jaccard_score * 45.0) +
            (proximity_score * 35.0) +
            academic_bonus +
            preference_bonus +
            10.0  # Encouragement baseline
        )
        match_score = min(98, max(52, int(round(raw_score))))

        # 3. Generate Human-Readable Eligibility & Fit Explanations
        eligibility_reasons = []
        if s_percentage >= min_pct:
            eligibility_reasons.append(
                f"Your {s_percentage:.0f}% clears the minimum cutoff of {min_pct:.0f}%."
            )
        else:
            eligibility_reasons.append(
                f"Close to the {min_pct:.0f}% cutoff; eligible with vocational bridge or practical exam."
            )

        matched_tag_names = [t.replace('_', ' ').title() for t in (s_interests & c_tags)]
        if matched_tag_names:
            eligibility_reasons.append(
                f"Directly matches your interest in: {', '.join(matched_tag_names[:3])}."
            )
        else:
            eligibility_reasons.append(
                f"Broadly aligns with your practical and problem-solving aptitude."
            )

        if is_vocational:
            eligibility_reasons.append(
                "Short-term vocational / ITI pathway: Start earning within 1-2 years."
            )
        else:
            eligibility_reasons.append(
                f"Structured degree pathway offering high long-term career progression."
            )

        # 4. Prepare Recharts Radar Chart Structure
        radar_chart_data = []
        for dim in RADAR_DIMENSIONS:
            radar_chart_data.append({
                "subject": DIMENSION_LABELS.get(dim, dim.capitalize()),
                "student": student_aptitude.get(dim, 5.0),
                "career": c_vector.get(dim, 5.0),
                "fullMark": 10
            })

        career_dict = career.to_dict() if hasattr(career, 'to_dict') else dict(career)
        career_dict["match_score"] = match_score
        career_dict["eligibility_reasons"] = eligibility_reasons
        career_dict["radar_chart_data"] = radar_chart_data

        scored_careers.append(career_dict)

    # Sort descending by match score
    scored_careers.sort(key=lambda x: x["match_score"], reverse=True)
    return scored_careers


def evaluate_scholarships(scholarships, student_profile):
    """
    Evaluates scholarships based on academic, income, gender, and social category eligibility.
    """
    s_class = parse_class_level(student_profile.get("class_level", 12))
    s_stream = str(student_profile.get("stream", "PCM")).upper().strip()
    s_percentage = safe_float(student_profile.get("percentage", 65.0))
    s_income_bracket = student_profile.get("income_bracket", "2_5l_to_4_5l")
    s_income_val = INCOME_ESTIMATES.get(s_income_bracket, 300000)
    s_gender = student_profile.get("gender", "All").strip().capitalize()
    s_category = student_profile.get("category", "General").strip().upper()

    allowed_streams = STREAM_MAP.get(s_stream, ["ANY", "GENERAL", "ALL"])
    matched_scholarships = []

    now = datetime.now()

    for sch in scholarships:
        # Class level check
        min_class = sch.min_class if hasattr(sch, 'min_class') else sch.get('min_class', 10)
        if min_class > s_class:
            continue

        # Stream check
        raw_streams = sch.streams_list if hasattr(sch, 'streams_list') else sch.get('eligible_streams', [])
        c_streams = [s.upper() for s in raw_streams]
        stream_matched = (
            "ALL" in c_streams or
            "ANY" in c_streams or
            any(stream in c_streams for stream in allowed_streams)
        )
        if not stream_matched:
            continue

        # Academic marks check
        min_pct = sch.min_percentage if hasattr(sch, 'min_percentage') else sch.get('min_percentage', 50.0)
        if s_percentage < min_pct:
            continue

        # Income ceiling check
        max_income = sch.max_income_limit if hasattr(sch, 'max_income_limit') else sch.get('max_income_limit', 0.0)
        if max_income > 0 and s_income_val > max_income:
            continue

        # Gender check
        gender_elig = sch.gender_eligibility if hasattr(sch, 'gender_eligibility') else sch.get('gender_eligibility', 'All')
        if gender_elig.lower() == "girls only" and s_gender not in ["Female", "Girl"]:
            continue

        # Category check
        raw_cats = sch.categories_list if hasattr(sch, 'categories_list') else sch.get('category_eligibility', [])
        cats = [c.upper() for c in raw_cats]
        if "ALL" not in cats:
            category_match = (
                s_category in cats or
                (s_category == "EWS" and "EWS" in cats) or
                (s_category == "MINORITY" and "MINORITY" in cats)
            )
            if not category_match:
                continue

        # Calculate deadline status
        deadline_str = sch.deadline_date if hasattr(sch, 'deadline_date') else sch.get('deadline_date', '2026-12-31')
        try:
            deadline_dt = datetime.strptime(deadline_str, "%Y-%m-%d")
            days_left = (deadline_dt - now).days
            days_left = max(0, days_left)
        except Exception:
            days_left = 30

        # Eligibility Reasons checklist
        reasons = []
        reasons.append(f"Marks Check: Your {s_percentage:.0f}% meets or exceeds the {min_pct:.0f}% requirement.")

        if max_income > 0:
            reasons.append(
                f"Income Check: Your bracket qualifies under the ₹{max_income:,.0f} ceiling."
            )
        else:
            reasons.append("Merit Based: No family income cap required.")

        if gender_elig.lower() == "girls only":
            reasons.append("Empowerment Initiative: Reserved specifically for girl scholars.")

        if "ALL" not in cats:
            reasons.append(f"Category: Valid under {s_category} reservation scheme.")

        # Compute match score for scholarship
        base_match = 85
        if s_percentage >= (min_pct + 10):
            base_match += 7
        if gender_elig.lower() == "girls only":
            base_match += 4
        if "ALL" not in cats:
            base_match += 4
        match_score = min(99, base_match)

        sch_dict = sch.to_dict() if hasattr(sch, 'to_dict') else dict(sch)
        sch_dict["match_score"] = match_score
        sch_dict["days_left"] = days_left
        sch_dict["is_urgent"] = days_left <= 21
        sch_dict["eligibility_reasons"] = reasons

        matched_scholarships.append(sch_dict)

    # Sort descending by match score and imminent deadline
    matched_scholarships.sort(key=lambda x: (-x["match_score"], x["days_left"]))
    return matched_scholarships
