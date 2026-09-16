#!/usr/bin/env python3
"""Test script to verify the enhanced copilot engine handles new query types."""

from app_backend.services.copilot_engine import IntelligenceCopilot
from intelligence_engine import IntelligenceEngine

def test_new_queries():
    """Test the new query types we added to the copilot engine."""
    print("Testing Enhanced Intelligence Copilot - New Query Types")
    print("=" * 60)

    # Initialize engine and copilot
    engine = IntelligenceEngine()
    copilot = IntelligenceCopilot(engine)

    # Test queries for each new intent
    test_cases = [
        {
            "query": "How does the AI calculate threat scores?",
            "expected_intent": "THREAT_SCORE_METHODOLOGY",
            "description": "Threat score methodology question"
        },
        {
            "query": "What data sources does the AI use?",
            "expected_intent": "DATA_SOURCES_COVERAGE",
            "description": "Data sources and coverage question"
        },
        {
            "query": "How accurate is the threat scoring model?",
            "expected_intent": "MODEL_PERFORMANCE",
            "description": "Model performance question"
        },
        {
            "query": "Show me the verification test results",
            "expected_intent": "VERIFICATION_RESULTS",
            "description": "Verification results question"
        },
        {
            "query": "Explain the NLP engine enhancements",
            "expected_intent": "NLP_ENHANCEMENTS",
            "description": "NLP enhancements question"
        },
        {
            "query": "Describe the system architecture",
            "expected_intent": "SYSTEM_ARCHITECTURE",
            "description": "System architecture question"
        },
        {
            "query": "What can you do?",
            "expected_intent": "HELP_CAPABILITIES",
            "description": "Help/capabilities question"
        }
    ]

    passed = 0
    total = len(test_cases)

    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest {i}/{total}: {test_case['description']}")
        print(f"Query: {repr(test_case['query'])}")

        try:
            result = copilot.query(test_case['query'])
            intent = result_intent = result.get('intent', 'UNKNOWN')

            if result_intent == test_case['expected_intent']:
                print(f"RESULT: PASS - Correctly identified intent as '{result_intent}'")
                # Safely print answer preview (handle Unicode)
                answer_preview = result.get('answer_markdown', '')
                # Replace problematic Unicode characters for console display
                answer_preview = answer_preview.encode('ascii', 'replace').decode('ascii')
                answer_preview = (answer_preview[:200] + "...") if len(answer_preview) > 200 else answer_preview
                print(f"   Answer preview: {answer_preview}")
                passed += 1
            else:
                print(f"RESULT: FAIL - Expected '{test_case['expected_intent']}', got '{result_intent}'")
                # Safely print error answer
                error_answer = result.get('answer_markdown', '')
                error_answer = error_answer.encode('ascii', 'replace').decode('ascii')
                print(f"   Answer: {error_answer[:100]}...")

        except Exception as e:
            print(f"RESULT: ERROR - Exception occurred: {str(e).encode('ascii', 'replace').decode('ascii')}")

    print("\n" + "=" * 60)
    print(f"Results: {passed}/{total} tests passed")

    if passed == total:
        print("SUCCESS: ALL NEW QUERY TYPES ARE WORKING CORRECTLY!")
        return True
    else:
        print("FAILURE: Some tests failed. Please review the implementation.")
        return False

if __name__ == "__main__":
    success = test_new_queries()
    exit(0 if success else 1)