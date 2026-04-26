def calculate_selection_rate(data, group_key):
    group_counts = {}
    selected_counts = {}

    for row in data:
        group = row[group_key]
        selected = row["Selected"].strip().lower()

        if group not in group_counts:
            group_counts[group] = 0
            selected_counts[group] = 0

        group_counts[group] += 1

        if selected == "yes":
            selected_counts[group] += 1

    rates = {}
    for group in group_counts:
        rates[group] = selected_counts[group] / group_counts[group]

    return rates


def detect_bias(rates, threshold=0.2):
    values = list(rates.values())

    if len(values) < 2:
        return False, 0

    difference = max(values) - min(values)
    bias = difference > threshold

    return bias, round(difference, 2)