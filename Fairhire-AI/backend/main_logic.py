from parser import parse_csv
from bias import calculate_selection_rate, detect_bias

def analyze_attribute(data, attribute):
    rates = calculate_selection_rate(data, attribute)
    bias, difference = detect_bias(rates)

    return {
        "attribute": attribute,
        "rates": rates,
        "bias_detected": bias,
        "difference": difference
    }

# NEW FUNCTION 🔥
def detect_cgpa_bias(data):
    high_cgpa_selected = 0
    high_cgpa_total = 0

    high_skill_selected = 0
    high_skill_total = 0

    for row in data:
        cgpa = float(row["CGPA"])
        skills = row["Skills"].lower()
        selected = row["Selected"].lower()

        # High CGPA
        if cgpa >= 9:
            high_cgpa_total += 1
            if selected == "yes":
                high_cgpa_selected += 1

        # High Skills
        if skills == "high":
            high_skill_total += 1
            if selected == "yes":
                high_skill_selected += 1

    cgpa_rate = high_cgpa_selected / high_cgpa_total if high_cgpa_total else 0
    skill_rate = high_skill_selected / high_skill_total if high_skill_total else 0

    insight = ""
    if cgpa_rate > skill_rate:
        insight = "Model is over-prioritizing CGPA over skills."
    else:
        insight = "Model fairly considers skills along with CGPA."

    return {
        "cgpa_selection_rate": round(cgpa_rate, 2),
        "skill_selection_rate": round(skill_rate, 2),
        "insight": insight
    }


def analyze_data(file_path):
    data = parse_csv(file_path)

    # Existing bias checks
    gender_result = analyze_attribute(data, "Gender")
    college_result = analyze_attribute(data, "College")

    # NEW ANALYSIS 🔥
    cgpa_analysis = detect_cgpa_bias(data)

    overall_bias = gender_result["bias_detected"] or college_result["bias_detected"]

    return {
        "bias_detected": overall_bias,
        "results": {
            "Gender": gender_result,
            "College": college_result
        },
        "cgpa_insight": cgpa_analysis
    }