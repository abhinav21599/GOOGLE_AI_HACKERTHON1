from main_logic import analyze_data

import json
from main_logic import analyze_data

result = analyze_data("sample.csv")

print(json.dumps(result, indent=4))