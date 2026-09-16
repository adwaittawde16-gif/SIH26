q = "explain the nlp engine enhancements"
print("Query:", repr(q))
print("Lowercase:", repr(q.lower()))

cond1 = any(w in q.lower() for w in ["how", "calculate", "methodology", "formula", "weight", "score", "threat", "explain", "work"])
print("Condition 1:", cond1)
print("  Matches:", [w for w in ["how", "calculate", "methodology", "formula", "weight", "score", "threat", "explain", "work"] if w in q.lower()])

cond2 = any(w in q.lower() for w in ["threat", "score", "ai", "model", "method", "calculate", "compute", "determine", "work", "function", "algorithm"])
print("Condition 2:", cond2)
print("  Matches:", [w for w in ["threat", "score", "ai", "model", "method", "calculate", "compute", "determine", "work", "function", "algorithm"] if w in q.lower()])

print("Overall:", cond1 and cond2)