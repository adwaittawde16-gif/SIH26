"""
app_backend/services/nlp_engine.py
----------------------------------

Advanced NLP Entity Extraction, Legal Intelligence, and Entity Resolution Engine.


Features:

- Hybrid contextual NER (Suspects, Aliases, Victims, Informants, Weapons, Vehicles, Locations, Dates, IPC/BNS sections, Phone/IMEI).

- Phonetic & Fuzzy Name Resolution (Levenshtein + Token Sort) against the Master Police Criminal Database.

- Statutory IPC / BNS (Bharatiya Nyaya Sanhita) Section extraction with legal title and severity score.

- Modus Operandi (M.O.) classification with semantic keyword scoring.

- Directional relation graph extractor (Co-accused, Harbored, Financed, Communicated, Commanded).

"""


import re
import os
import json
import math
import hashlib
from typing import List, Dict, Any, Optional, Tuple, Set

# Optional ML/NLP accelerators. The rule-based engine remains fully functional
# when these packages are not installed, which keeps serverless deployments small.
try:
    import spacy
except ImportError:
    spacy = None

try:
    from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
    from sentence_transformers import SentenceTransformer
    import torch
    TRANSFORMERS_AVAILABLE = True
except ImportError:
    TRANSFORMERS_AVAILABLE = False
    AutoTokenizer = None
    AutoModelForTokenClassification = None
    pipeline = None
    SentenceTransformer = None
    torch = None

import difflib
from typing import List, Dict, Any, Optional, Tuple, Set


def soundex(text: str) -> str:

    """

    Soundex algorithm for phonetic matching of names.

    Returns a 4-character code representing the phonetic pronunciation.

    """

    if not text:

        return "0000"


    text = text.upper()

    # First letter

    soundex_code = text[0]


    # Mapping of letters to digits

    mapping = {

        'BFPV': '1',

        'CGJKQSXZ': '2',

        'DT': '3',

        'L': '4',

        'MN': '5',

        'R': '6'

    }


    # Convert letters to digits

    for char in text[1:]:

        for key, digit in mapping.items():

            if char in key:

                soundex_code += digit

                break


    # Remove zeros and duplicates

    soundex_code = ''.join([c for i, c in enumerate(soundex_code)

                           if i == 0 or c != soundex_code[i-1]])

    soundex_code = soundex_code.replace('0', '')


    # Pad or truncate to 4 characters

    soundex_code = (soundex_code + '000')[:4]


    return soundex_code


def metaphone(text: str) -> str:

    """

    Simplified Metaphone algorithm for phonetic matching.

    Returns a phonetic code for matching similar sounding names.

    """

    if not text:

        return ""


    text = text.upper()

    # Handle special cases at the beginning

    if text.startswith(('AE', 'GN', 'KN', 'PN', 'PS', 'WR')):

        text = text[1:]

    elif text.startswith('X'):

        text = 'S' + text[1:]

    elif text.startswith('WH'):

        text = 'W' + text[2:]


    # Define transformations

    i = 0

    result = []


    while i < len(text):

        # Handle double letters (except for 'C')

        if i < len(text) - 1 and text[i] == text[i+1] and text[i] != 'C':

            result.append(text[i])

            i += 2

            continue


        # Handle specific letter patterns

        if text[i:i+2] == 'SH':

            result.append('X')

            i += 2

        elif text[i:i+2] in ('TI', 'CI'):

            if i == 0 or not text[i-1].isdigit():  # Not after a digit

                result.append('X')

            i += 2

        elif text[i:i+2] == 'TH':

            result.append('0')

            i += 2

        elif text[i:i+2] in ('CH', 'GH') and i > 0 and text[i-1] not in 'AEIOU':

            # Skip silent GH

            if text[i:i+2] == 'GH':

                i += 2

            else:  # CH

                result.append('X')

                i += 2

        elif text[i] in 'AEIOUYW':

            # Vowels: only keep the first one unless it's the first letter

            if i == 0:

                result.append(text[i])

            i += 1

            # Skip consecutive vowels

            while i < len(text) and text[i] in 'AEIOUYW':

                i += 1

        elif text[i] == 'Q':

            result.append('K')

            i += 1

        elif text[i] == 'Z':

            result.append('S')

            i += 1

        elif text[i] == 'M':

            result.append('M')

            i += 1

            # Skip if followed by another M

            if i < len(text) and text[i] == 'M':

                i += 1

        elif text[i] == 'F':

            result.append('F')

            i += 1

        elif text[i] == 'N':

            result.append('N')

            i += 1

        elif text[i] == 'H':

            # Only keep H if between vowels

            if i > 0 and i < len(text) - 1 and text[i-1] in 'AEIOU' and text[i+1] in 'AEIOU':

                result.append('H')

            i += 1

        elif text[i] in 'DG':

            if i == len(text) - 1 or not text[i+1].isdigit():  # Not before a digit

                if text[i] == 'G' and i > 0 and i < len(text) - 1 and text[i-1] not in 'AEIOU':

                    # Soft G before E, I, Y -> J

                    if text[i+1] in 'EIY':

                        result.append('J')

                    else:

                        result.append('K')

                else:

                    result.append(text[i])

            else:

                # Hard G before digit -> K

                result.append('K')

            i += 1

        elif text[i] == 'B':

            # B is silent after M at the end of a word

            if not (i > 0 and text[i-1] == 'M' and i == len(text) - 1):

                result.append('B')

            i += 1

        elif text[i] == 'K':

            # K is silent after C

            if not (i > 0 and text[i-1] == 'C'):

                result.append('K')

            i += 1

        elif text[i] == 'P':

            # P is silent before H

            if not (i < len(text) - 1 and text[i+1] == 'H'):

                result.append('P')

            i += 1

        elif text[i] == 'R':

            # R is silent after a vowel at the end of a word

            if not (i > 0 and text[i-1] in 'AEIOU' and i == len(text) - 1):

                result.append('R')

            i += 1

        elif text[i] == 'L':

            result.append('L')

            i += 1

        elif text[i] in '0123456789':

            # Skip digits

            i += 1

        else:

            # Default: keep the consonant

            result.append(text[i])

            i += 1


    return ''.join(result)


# ---------------------------------------------------------------------------

# STATUTORY IPC & BNS (Bharatiya Nyaya Sanhita) SECTION KNOWLEDGE BASE

# ---------------------------------------------------------------------------

LEGAL_STATUTES: Dict[str, Dict[str, Any]] = {

    "302": {"title": "Murder / Punishment for Murder", "bns_equiv": "BNS Sec 103", "severity": 10, "category": "Violent Crime", "bailable": False},

    "307": {"title": "Attempt to Murder", "bns_equiv": "BNS Sec 109", "severity": 9, "category": "Violent Crime", "bailable": False},

    "384": {"title": "Extortion", "bns_equiv": "BNS Sec 308(2)", "severity": 8, "category": "Extortion & Organized Crime", "bailable": False},

    "386": {"title": "Extortion by putting a person in fear of death or grievous hurt", "bns_equiv": "BNS Sec 308(4)", "severity": 9, "category": "Extortion & Organized Crime", "bailable": False},

    "392": {"title": "Robbery", "bns_equiv": "BNS Sec 309", "severity": 7, "category": "Property Crime", "bailable": False},

    "395": {"title": "Dacoity / Gang Robbery", "bns_equiv": "BNS Sec 310", "severity": 9, "category": "Organized Gang Crime", "bailable": False},
    "397": {"title": "Robbery or Dacoity with attempt to cause death or grievous hurt", "bns_equiv": "BNS Sec 311", "severity": 9, "category": "Violent Robbery", "bailable": False},
    "120B": {"title": "Criminal Conspiracy", "bns_equiv": "BNS Sec 61(2)", "severity": 8, "category": "Conspiracy", "bailable": False},
    "420": {"title": "Cheating and Dishonestly Inducing Delivery of Property", "bns_equiv": "BNS Sec 318(4)", "severity": 6, "category": "Financial Crime", "bailable": True},
    "467": {"title": "Forgery of Valuable Security", "bns_equiv": "BNS Sec 338", "severity": 7, "category": "Document Forgery", "bailable": False},
    "468": {"title": "Forgery for Purpose of Cheating", "bns_equiv": "BNS Sec 336(3)", "severity": 7, "category": "Financial Forgery", "bailable": False},
    "34": {"title": "Acts done by several persons in furtherance of common intention", "bns_equiv": "BNS Sec 3(5)", "severity": 5, "category": "Common Intention", "bailable": True},
    "147": {"title": "Punishment for Rioting", "bns_equiv": "BNS Sec 191(2)", "severity": 6, "category": "Public Disorder", "bailable": True},
    "148": {"title": "Rioting, armed with deadly weapon", "bns_equiv": "BNS Sec 191(3)", "severity": 7, "category": "Armed Riot", "bailable": False},
    "411": {"title": "Dishonestly receiving stolen property", "bns_equiv": "BNS Sec 317(2)", "severity": 5, "category": "Fencing", "bailable": True},
    "201": {"title": "Causing disappearance of evidence of offence", "bns_equiv": "BNS Sec 238", "severity": 6, "category": "Evidence Tampering", "bailable": True},
    "506": {"title": "Criminal Intimidation", "bns_equiv": "BNS Sec 351(2)", "severity": 6, "category": "Intimidation", "bailable": True},
    "25": {"title": "Arms Act - Illegal Possession / Manufacture of Firearm", "bns_equiv": "Arms Act Sec 25/27", "severity": 9, "category": "Arms & Explosives", "bailable": False},
    "27": {"title": "Arms Act - Use of Arms / Ammunition in crime", "bns_equiv": "Arms Act Sec 27", "severity": 9, "category": "Arms & Explosives", "bailable": False},
    "8": {"title": "NDPS Act - Prohibition of certain operations (Narcotics)", "bns_equiv": "NDPS Act Sec 8(c)", "severity": 9, "category": "Narcotics", "bailable": False},
    "8(C)": {"title": "NDPS Act - Prohibition of cultivation, possession & trade", "bns_equiv": "NDPS Act Sec 8(c)", "severity": 9, "category": "Narcotics", "bailable": False},
    "20": {"title": "NDPS Act - Punishment for contravention in relation to cannabis", "bns_equiv": "NDPS Act Sec 20(b)", "severity": 8, "category": "Narcotics", "bailable": False},
    "21": {"title": "NDPS Act - Punishment for contravention in relation to manufactured drugs (Heroin/Cocaine/MDMA)", "bns_equiv": "NDPS Act Sec 21", "severity": 10, "category": "Narcotics", "bailable": False},
    "29": {"title": "NDPS Act - Punishment for abetment and criminal conspiracy", "bns_equiv": "NDPS Act Sec 29", "severity": 9, "category": "Narcotics", "bailable": False},
    "3(1)": {"title": "MCOCA - Punishment for organized crime", "bns_equiv": "MCOCA Sec 3(1)", "severity": 10, "category": "Organized Syndicate", "bailable": False}
}


# ---------------------------------------------------------------------------

# MODUS OPERANDI TAXONOMY & WEIGHTS

# ---------------------------------------------------------------------------

CRIME_TAXONOMY: Dict[str, Dict[str, Any]] = {

    "Narcotics Trafficking": {

        "keywords": ["contraband", "mdma", "mephedrone", "heroin", "ganja", "charas", "hashish", "grams", "kg", "smuggling", "peddler", "consignment", "drug runner", "stash house", "pouch", "substance", "narcotic", "packet", "synthetic drug"],

        "base_weight": 0.85

    },

    "Extortion & Protection Racket": {

        "keywords": ["extortion", "hafta", "vasooli", "protection money", "ransom", "threat call", "demanded", "lakhs", "crores", "builder", "businessman", "contractor", "angadia", "threatened", "death threat", "intimidation"],

        "base_weight": 0.88

    },

    "Armed Robbery / Dacoity": {

        "keywords": ["revolver", "pistol", "country made", "katta", "firearm", "deshi katta", "cartridges", "magazine", "shot", "bullet", "knife", "dagger", "chopper", "looted", "cash van", "jewellery", "bank", "snatched"],

        "base_weight": 0.90

    },

    "Contract Killing / Hit": {

        "keywords": ["supari", "shooter", "target killed", "assassination", "ambush", "hired killer", "firing", "point blank", "drive by", "recce", "spotter", "sharpshooter"],

        "base_weight": 0.95

    },

    "Hawala & Money Laundering": {

        "keywords": ["hawala", "cash courier", "angadia", "shell company", "mule account", "crypto", "usdt", "token", "benami", "illicit transfer", "kickback", "cash dump", "unaccounted"],

        "base_weight": 0.82

    },

    "Illegal Arms Smuggling": {

        "keywords": ["arms consignment", "factory made", "9mm", "7.65mm", "ammunition", "ordnance", "gun runner", "armory", "silencer", "automatic weapon"],

        "base_weight": 0.89

    },

    "Cyber Syndicate / Identity Theft": {

        "keywords": ["sim swap", "spoofed", "otp", "phishing", "fake id", "pan card", "forged aadhar", "call center", "mule kit", "apk", "botnet"],

        "base_weight": 0.75

    }

}

# ---------------------------------------------------------------------------

# GAZETTEER / REGEX REPOSITORY

# ---------------------------------------------------------------------------

MUMBAI_LOCATIONS = [
    "Dadar", "Lower Parel", "Byculla", "Agripada", "Lamington Road",
    "Grant Road", "Station Road", "Madanpura", "Venus Wine Shop", "MIDC Road",
    "Worli", "Bandra", "Andheri", "Kurla", "Colaba", "Dharavi", "Chembur",
    "Ghatkopar", "Mulund", "Thane", "Navi Mumbai", "Mahim", "Sion", "Crawford Market",
    "Dongri", "Nagpada", "Antop Hill", "Govandi", "Malad", "Borivali", "Kandivali",
    "Vikhroli", "Charni Road", "Kalbadevi", "Mazgaon", "Sewri", "Parel",
    "Nariman Point", "Marine Drive", "Zaveri Bazaar", "Bhadakamkar Marg",
    "Senapati Bapat Marg", "Byculla Station Road", "Juhu", "Santacruz",
    "Vile Parle", "Goregaon", "Jogeshwari", "Wadala", "Cotton Green", "Churchgate", "Fort", "CST", "Mumbai Central"
]

WEAPON_PATTERNS = [
    r'\b(?:country[- ]made|deshi|desi)\s*(?:pistol|katta|revolver|tamancha|weapon)\b',
    r'\b(?:9mm|7\.65mm|\.32|\.45|12[- ]bore)\s*(?:pistol|revolver|gun|firearm|caliber|bore)\b',
    r'\b(?:pistol|revolver|firearm|gun|rifle|shotgun|carbine|chopper|knife|dagger|sword|machete|cleaver|weapon|arms)\b',
    r'\b(?:live\s*cartridges|empty\s*shell\s*casings?|shell\s*casings?|rounds|magazines?|ammunition|bullets?)\b'
]

VEHICLE_PATTERNS = [
    r'\b(?:MH|DL|GJ|KA|HR|UP)\s*[-.]?\s*\d{1,2}\s*[-.]?\s*[A-Z]{1,3}\s*[-.]?\s*\d{1,4}\b',
    r'\b(?:black|white|silver|red|grey|blue|dark)?\s*(?:pulsar|splendor|activa|bullet|ktm|scorpio|innova|fortuner|swift|creta|thar|auto-rickshaw|taxi|van|bolero|motorcycle|getaway bike|bike|cash van|truck|container)\b'
]

ALIAS_INDICATORS = [

    r'(?:alias|a\.k\.a\.?|alias\s+name|known\s+as|nicknamed|called)\s+["\']?([A-Za-z0-9\s_-]+?)["\']?(?:,|\.|\s+and|\s+was|\s+is|\s*\()',

    r'["\']([A-Za-z0-9\s_-]{2,20})["\']\s+(?:bhai|shooter|doctor|chhota|pandit|sheikh|don)'

]

ROLE_KEYWORDS = {

    "Mastermind / Kingpin": ["mastermind", "kingpin", "boss", "syndicate head", "handler", "financier", "main conspirator", "ordered the hit", "operator"],

    "Sharpshooter / Shooter": ["shooter", "fired", "trigger man", "gunman", "assassin", "shot at", "opened fire"],

    "Logistics & Recce": ["recce", "surveyed", "spotter", "provided vehicle", "provided weapon", "arranged safehouse", "biker", "getaway driver"],

    "Mule / Courier": ["courier", "cash carrier", "peddler", "mule", "angadia agent", "delivered packet", "collected payment"],

    "Victim / Target": ["complainant", "victim", "builder", "target", "businessman", "shopkeeper", "deceased", "injured"]

}

# ---------------------------------------------------------------------------

# ENTITY EXTRACTION ENGINE CLASS

# ---------------------------------------------------------------------------

class AdvancedNLPEngine:

    def __init__(self, master_suspects: Any = None, master_phones: Optional[Dict[str, str]] = None):

        if master_suspects is not None and hasattr(master_suspects, 'all_suspects'):

            self.master_suspects = list(master_suspects.all_suspects)

            self.master_phones = getattr(master_suspects, 'phone_to_name', {}) or master_phones or {}

        elif isinstance(master_suspects, (list, set, tuple)):

            self.master_suspects = list(master_suspects)

            self.master_phones = master_phones or {}

        else:

            self.master_suspects = []

            self.master_phones = master_phones or {}

        # Initialize transformer-based models for enhanced NLP (lazy loading)
        self._ner_pipeline = None
        self._sentence_model = None
        self._pos_tagger = None
        self._nlp = None
        self._models_loaded = False

        # Cache for embeddings to improve performance
        self._suspect_name_embeddings = {}
        self._embedding_cache = {}

        # Confidence calibration parameters (can be updated with historical data)
        self._confidence_calibration_params = {
            "SUSPECT_PERSON": {"a": 1.0, "b": 0.0},  # Platt scaling parameters: y = 1/(1+exp(-(a*x+b)))
            "LEGAL_STATUTE": {"a": 1.0, "b": 0.0},
            "WEAPON_ORDNANCE": {"a": 1.0, "b": 0.0},
            "VEHICLE_LOGISTICS": {"a": 1.0, "b": 0.0},
            "LOCATION": {"a": 1.0, "b": 0.0},
            "ALIAS_MONIKER": {"a": 1.0, "b": 0.0},
            "FINANCIAL_AMOUNT": {"a": 1.0, "b": 0.0},
            "DATETIME_STAMP": {"a": 1.0, "b": 0.0},
            "PHONE_NUMBER": {"a": 1.0, "b": 0.0}
        }

    def _load_models(self):
        """Lazy load transformer-based models to minimize startup time."""
        if self._models_loaded or not TRANSFORMERS_AVAILABLE:
            return

        try:
            # Load NER model for entity recognition (using a model trained on legal/police data if available)
            # For now, we'll use a general NER model and fine-tune the approach
            model_name = "dslim/bert-base-NER"  # Good general NER model
            self._ner_pipeline = pipeline(
                "ner",
                model=model_name,
                tokenizer=model_name,
                aggregation_strategy="simple",
                device=0 if torch.cuda.is_available() else -1
            )

            # Load sentence transformer for semantic similarity and embeddings
            self._sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
            # Load spaCy model for dependency parsing
            try:
                self._nlp = spacy.load("en_core_web_sm")
            except OSError:
                # If not found, try to download it
                try:
                    spacy.cli.download("en_core_web_sm")
                    self._nlp = spacy.load("en_core_web_sm")
                except Exception as e:
                    print(f"Warning: Could not load spaCy model: {e}")
                    self._nlp = None

            self._models_loaded = True
        except Exception as e:
            # Fallback to rule-based approach if model loading fails
            print(f"Warning: Could not load transformer models: {e}")
            self._models_loaded = False

    def _get_suspect_name_embedding(self, name: str):
        """Get or compute embedding for a suspect name."""
        if name in self._suspect_name_embeddings:
            return self._suspect_name_embeddings[name]

        if not self._models_loaded:
            self._load_models()

        if self._models_loaded and self._sentence_model:
            try:
                embedding = self._sentence_model.encode(name, normalize_embeddings=True)
                self._suspect_name_embeddings[name] = embedding
                return embedding
            except Exception:
                return None
        return None

    def _calibrate_confidence(self, raw_confidence: float, entity_type: str) -> float:
        """
        Calibrate confidence scores using Platt scaling or isotonic regression.
        In a production system, these parameters would be learned from validation data.
        """
        # Simple linear calibration for demonstration
        # In practice, we would use sklearn's CalibratedClassifierCV or similar
        params = self._confidence_calibration_params.get(entity_type, {"a": 1.0, "b": 0.0})
        a, b = params["a"], params["b"]

        # Apply Platt scaling: y = 1/(1+exp(-(a*x+b)))
        # But since our scores are already in [0,1], we'll use a simpler linear transform
        # and clamp to [0.01, 0.99] to avoid extreme values
        calibrated = max(0.01, min(0.99, a * raw_confidence + b))
        return calibrated

    def _estimate_uncertainty(self, confidence: float) -> float:
        """
        Estimate uncertainty of an extraction.
        Returns a value in [0,1] where 0 is certain and 1 is completely uncertain.
        """
        # Simple uncertainty estimation: uncertainty = 1 - confidence
        # More sophisticated methods could use entropy or variance from multiple models
        return 1.0 - confidence

    def _apply_confidence_calibration(self, entities: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Apply confidence calibration to a list of entities."""
        calibrated_entities = []
        for entity in entities:
            # Create a copy to avoid modifying the original
            calibrated_entity = entity.copy()
            raw_confidence = entity.get("confidence", 0.0)
            entity_type = entity.get("category", "UNKNOWN")

            # Apply calibration
            calibrated_confidence = self._calibrate_confidence(raw_confidence, entity_type)
            calibrated_entity["confidence"] = calibrated_confidence

            # Add uncertainty estimation
            uncertainty = self._estimate_uncertainty(calibrated_confidence)
            calibrated_entity["uncertainty"] = round(uncertainty, 3)

            calibrated_entities.append(calibrated_entity)
        return calibrated_entities

    def _compute_semantic_similarity(self, text1: str, text2: str) -> float:
        """Compute semantic similarity between two text strings using sentence transformers."""
        if not self._models_loaded:
            self._load_models()

        if self._models_loaded and self._sentence_model:
            try:
                embeddings = self._sentence_model.encode([text1, text2], normalize_embeddings=True)
                similarity = float(embeddings[0] @ embeddings[1])  # Dot product for normalized vectors
                return max(0.0, min(1.0, similarity))  # Clamp to [0,1]
            except Exception:
                pass
        # Fallback to sequence matcher
        return difflib.SequenceMatcher(None, text1.lower(), text2.lower()).ratio()

    def fuzzy_match_suspect(self, candidate_text: str, threshold: float = 0.82) -> Optional[Tuple[str, float]]:
        """Match candidate string against known criminal suspect registry using enhanced hybrid matching."""
        candidate_clean = candidate_text.strip().lower()
        if not candidate_clean or len(candidate_clean) < 3:
            return None

        best_match = None
        best_score = 0.0

        # Precompute phonetic codes for candidate
        candidate_soundex = soundex(candidate_clean)
        candidate_metaphone = metaphone(candidate_clean)

        for known in self.master_suspects:
            known_clean = known.strip().lower()
            if not known_clean:
                continue

            # Exact substring match (highest confidence)
            if candidate_clean in known_clean or known_clean in candidate_clean:
                score = 0.95
            else:
                # Hybrid approach: combine multiple similarity metrics

                # 1. SequenceMatcher ratio (rule-based)
                ratio_score = difflib.SequenceMatcher(None, candidate_clean, known_clean).ratio()

                # 2. Phonetic matching boost
                phonetic_boost = 0.0
                known_soundex = soundex(known_clean)
                known_metaphone = metaphone(known_clean)

                if candidate_soundex == known_soundex:
                    phonetic_boost += 0.1
                if candidate_metaphone == known_metaphone:
                    phonetic_boost += 0.1

                # 3. Semantic similarity (transformer-based)
                semantic_score = self._compute_semantic_similarity(candidate_clean, known_clean)

                # Combined weighted score
                # Weights: 0.4 for sequence matcher, 0.3 for phonetic, 0.3 for semantic
                score = min(
                    0.4 * ratio_score +
                    0.3 * min(phonetic_boost * 10, 1.0) +  # Scale phonetic boost to 0-1 range
                    0.3 * semantic_score,
                    0.99
                )

            if score > best_score and score >= threshold:
                best_score = score
                best_match = known

        if best_match:
            return best_match, round(best_score, 3)
        return None

    def _format_raw_section(self, matched_text: str, code: str) -> str:

        """Format the raw section text to avoid duplication."""

        matched_text = matched_text.strip()

        if not matched_text:

            return f"Section {code}"


        # Check if the matched text already contains a proper section prefix

        upper_text = matched_text.upper()

        if upper_text.startswith("SECTION"):

            # Already has Section, return as-is but clean up extra spaces

            return " ".join(matched_text.split())

        elif re.search(r'(?:IPC|INDIAN\s+PENAL\s+CODE|BNS|BHARATIYA\s+NYAYA\s+SANHITA|ARMS\s+ACT|NDPS\s+ACT|MCOCA)', matched_text, re.IGNORECASE):

            # Has act name, return as Section {code}

            return f"Section {code}"

        else:

            # Default format

            return f"Section {code}"

    def extract_ipc_and_statutes(self, text: str) -> List[Dict[str, Any]]:
        """Extract IPC / BNS sections, NDPS, Arms Act sections and attach legal metadata."""
        statutes_found = []
        seen = set()

        # Step 1: Extract from multi-section compound blocks (e.g. u/s 384, 386, 120B, 506 IPC r/w Section 25 Arms Act)
        compound_block_patterns = [
            r'(?:u/s|under\s+sections?|sections?|sec\.?)\s+([0-9A-Za-z,\s\(\)/r/w\.\-&]+?)(?:\s+(?:IPC|Indian\s+Penal\s+Code|BNS|Bharatiya\s+Nyaya\s+Sanhita|Arms\s+Act|NDPS\s+Act|MCOCA|r/w|\.|$))',
            r'\b(?:IPC|BNS|NDPS\s+Act|Arms\s+Act|MCOCA)\s+(?:Sec(?:tion)?s?\.?\s*)?([0-9A-Za-z,\s\(\)/r/w\.\-&]+?)(?:\s+(?:IPC|BNS|r/w|\.|$))'
        ]

        for block_pat in compound_block_patterns:
            for block_match in re.finditer(block_pat, text, re.IGNORECASE):
                block_text = block_match.group(1)
                tokens = re.findall(r'\b[0-9]{1,3}[A-Za-z]?(?:\([0-9a-zA-Z]\))?\b', block_text)
                for code in tokens:
                    code_clean = code.strip().upper().replace('O', '0').replace('I', '1').replace('L', '1')
                    if not code_clean or len(code_clean) < 1:
                        continue
                    if code_clean in seen:
                        continue
                    seen.add(code_clean)
                    info = LEGAL_STATUTES.get(code_clean, {
                        "title": f"Statutory Violation Section {code_clean}",
                        "bns_equiv": "BNS Relevant Section",
                        "severity": 6,
                        "category": "General Offence",
                        "bailable": True
                    })
                    statutes_found.append({
                        "raw_section": f"Section {code_clean}",
                        "code": code_clean,
                        "title": info["title"],
                        "bns_equivalent": info.get("bns_equiv", "N/A"),
                        "severity_score": info.get("severity", 5),
                        "category": info.get("category", "General Offence"),
                        "bailable": info.get("bailable", True),
                        "confidence": 0.95
                    })

        # Step 2: Extract explicit known statutory sections mentioned anywhere in text
        for known_code, info in LEGAL_STATUTES.items():
            if known_code in seen:
                continue
            # Match section pattern for this known code
            code_pat = r'\b(?:u/s|sec(?:tion)?\.?|IPC|BNS|Arms\s+Act|NDPS\s+Act|MCOCA)?\s*' + re.escape(known_code) + r'\b'
            if re.search(code_pat, text, re.IGNORECASE):
                seen.add(known_code)
                statutes_found.append({
                    "raw_section": f"Section {known_code}",
                    "code": known_code,
                    "title": info["title"],
                    "bns_equivalent": info.get("bns_equiv", "N/A"),
                    "severity_score": info.get("severity", 5),
                    "category": info.get("category", "General Offence"),
                    "bailable": info.get("bailable", True),
                    "confidence": 0.95
                })

        return statutes_found

    def classify_modus_operandi(self, text: str) -> List[Dict[str, Any]]:

        """Compute keyword similarity against crime taxonomies with enhanced context analysis."""
        text_lower = text.lower()

        results = []


        # Enhanced MO taxonomy with synonyms and context weights

        enhanced_taxonomy = {}

        for category, data in CRIME_TAXONOMY.items():

            keywords = data["keywords"]

            base_wt = data["base_weight"]


            # Expand keywords with common synonyms and variations

            expanded_keywords = list(keywords)  # Start with original


            # Add common variations for certain categories

            if category == "Narcotics Trafficking":

                expanded_keywords.extend(["smack", "brown sugar", "ice", "crystal", "shabu", "white"])

            elif category == "Extortion & Protection Racket":

                expanded_keywords.extend(["hafta", "vasooli", "protection money", "danger money", "boden"])

            elif category == "Armed Robbery / Dacoity":

                expanded_keywords.extend(["loot", "plunder", "bag snatched", "chain snatched"])

            elif category == "Contract Killing / Hit":

                expanded_keywords.extend(["supari", "supari khanna", "contract killer", "hitman"])

            elif category == "Hawala & Money Laundering":

                expanded_keywords.extend(["hundi", "chit funds", "ponzi scheme", "pyramid scheme"])

            elif category == "Illegal Arms Smuggling":

                expanded_keywords.extend(["illegal arms", "unlicensed arms", "country made pistol"])

            elif category == "Cyber Syndicate / Identity Theft":

                expanded_keywords.extend(["identity theft", "data breach", "phishing", "vishing"])


            enhanced_taxonomy[category] = {

                "keywords": expanded_keywords,

                "base_weight": base_wt

            }


        for category, data in enhanced_taxonomy.items():

            keywords = data["keywords"]

            base_wt = data["base_weight"]


            matched_kw = []

            for kw in keywords:

                # Use word boundary regex for exact word matching

                if re.search(r'\b' + re.escape(kw.lower()) + r'\b', text_lower):

                    matched_kw.append(kw)


            if matched_kw:

                # Enhanced scoring: consider context and frequency

                base_score = base_wt

                frequency_bonus = min(0.3, len(matched_kw) * 0.02)  # More matches = higher confidence

                context_bonus = 0.0


                # Context bonus: if multiple related keywords appear close together

                if len(matched_kw) >= 2:

                    # Check if matched keywords appear within a reasonable distance

                    positions = []

                    for kw in matched_kw:

                        # Find all occurrences of each keyword

                        for match in re.finditer(r'\b' + re.escape(kw.lower()) + r'\b', text_lower):

                            positions.append(match.start())


                    if len(positions) >= 2:

                        positions.sort()

                        # Calculate average distance between consecutive matches

                        distances = [positions[i+1] - positions[i] for i in range(len(positions)-1)]

                        avg_distance = sum(distances) / len(distances) if distances else 0

                        # Closer keywords get higher context bonus

                        if avg_distance < 50:  # Within 50 characters

                            context_bonus = 0.15

                        elif avg_distance < 100:  # Within 100 characters

                            context_bonus = 0.1


                score = min(0.99, base_score + frequency_bonus + context_bonus)

                results.append({

                    "crime_category": category,

                    "confidence": round(score, 3),

                    "matched_indicators": matched_kw,

                    "count": len(matched_kw)

                })


        # Apply transformer-based semantic enhancement if models are available
        if self._models_loaded and self._sentence_model:
            try:
                # For each result, enhance confidence using semantic similarity
                # between the text and category description
                for result in results:
                    category = result["crime_category"]
                    # Create a descriptive string for the category
                    category_desc = f"This text describes {category.lower().replace(' & ', ' ').replace('/', ' ')}"
                    # Compute semantic similarity
                    semantic_sim = self._compute_semantic_similarity(text, category_desc)
                    # Blend the original score with semantic similarity
                    original_conf = result["confidence"]
                    # Weight: 70% original score, 30% semantic similarity
                    enhanced_conf = 0.7 * original_conf + 0.3 * semantic_sim
                    result["confidence"] = round(min(0.99, enhanced_conf), 3)
            except Exception as e:
                # If semantic enhancement fails, continue with original scores
                pass


        results.sort(key=lambda x: x["confidence"], reverse=True)

        return results

    def extract_entities(self, text: str) -> Dict[str, Any]:

        """Perform comprehensive Named Entity Extraction & Resolution."""

        entities = []

        suspects_resolved = []

        aliases_found = []

        weapons_found = []

        vehicles_found = []

        locations_found = []

        phones_found = []

        dates_found = []

        financial_amounts = []


        # 1. Extract Phone Numbers
        phone_matches = re.findall(r'(?:\+?91[-.\s]?)?[6-9]\d{9}\b', text)
        for p in set(phone_matches):
            clean_p = re.sub(r'[^0-9+]', '', p)
            entities.append({"text": clean_p, "category": "PHONE_NUMBER", "confidence": 0.99})
            phones_found.append(clean_p)

        # 2. Extract Monetary Amounts & Contraband Quantities
        amount_matches = re.findall(r'(?:₹|Rs\.?|INR)\s*[\d,]+(?:\.\d+)?(?:\s*(?:Lakhs?|Crores?|Cr|L|k|thousand))?|\b\d+(?:\.\d+)?\s*(?:Lakhs?|Crores?|Cr|Lakh)\b|\b\d+\s*(?:grams?|kg|kilos?)\s*(?:of\s+)?(?:MDMA|contraband|heroin|mephedrone|ganja|cocaine|commercial\s+MDMA)?\b', text, re.IGNORECASE)
        for amt in set(amount_matches):
            amt_str = amt.strip()
            if len(amt_str) > 1 and amt_str.lower() not in [a.lower() for a in financial_amounts]:
                entities.append({"text": amt_str, "category": "FINANCIAL_AMOUNT", "confidence": 0.95})
                financial_amounts.append(amt_str)

        # 3. Extract Locations (Gazetteer + Prepositional Parsing)
        for loc in MUMBAI_LOCATIONS:
            if re.search(r'\b' + re.escape(loc) + r'\b', text, re.IGNORECASE):
                if loc.lower() not in [l.lower() for l in locations_found]:
                    locations_found.append(loc)
                    entities.append({"text": loc, "category": "LOCATION", "confidence": 0.92})

        # Prepositional location extraction (e.g. "near Venus Wine Shop", "at Lamington Road")
        prep_matches = re.findall(r'\b(?:near|at|around|towards|outside|in|from)\s+([A-Z][a-zA-Z0-9]+(?:\s+[A-Z][a-zA-Z0-9]+){1,3})\b', text)
        for cand_loc in prep_matches:
            cand_loc = cand_loc.strip()
            # Ignore false positives like "Special Crime Unit", "Arms Act"
            if not any(w in cand_loc.lower() for w in ["special", "unit", "act", "case", "ipc", "section", "accused", "complainant", "pistol", "rounds", "innova", "pulsar"]):
                if cand_loc.lower() not in [l.lower() for l in locations_found]:
                    locations_found.append(cand_loc)
                    entities.append({"text": cand_loc, "category": "LOCATION", "confidence": 0.88})

        # 4. Extract Weapons
        for pat in WEAPON_PATTERNS:
            for match in re.finditer(pat, text, re.IGNORECASE):
                wep = match.group(0).strip()
                if wep.lower() not in [w.lower() for w in weapons_found]:
                    weapons_found.append(wep)
                    entities.append({"text": wep, "category": "WEAPON_ORDNANCE", "confidence": 0.94})

        # 5. Extract Vehicles & Plates
        for pat in VEHICLE_PATTERNS:
            for match in re.finditer(pat, text, re.IGNORECASE):
                veh = match.group(0).strip()
                if veh.lower() not in [v.lower() for v in vehicles_found]:
                    vehicles_found.append(veh)
                    entities.append({"text": veh, "category": "VEHICLE_LOGISTICS", "confidence": 0.91})

        # 6. Extract Aliases
        for pat in ALIAS_INDICATORS:
            for match in re.finditer(pat, text, re.IGNORECASE):
                alias_candidate = match.group(1).strip()
                if len(alias_candidate) > 2 and alias_candidate.lower() not in [a.lower() for a in aliases_found]:
                    aliases_found.append(alias_candidate)
                    entities.append({"text": alias_candidate, "category": "ALIAS_MONIKER", "confidence": 0.88})

        # 7. Extract Dates & Timestamps
        date_matches = re.findall(r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b|\b\d{1,2}:\d{2}\s*(?:hrs|hours|AM|PM)?\b', text, re.IGNORECASE)
        for dt in set(date_matches):
            dt_str = dt.strip()
            if dt_str not in dates_found:
                dates_found.append(dt_str)
                entities.append({"text": dt_str, "category": "DATETIME_STAMP", "confidence": 0.90})


        # 8. Extract & Resolve Suspect Names
        potential_names = set()

        for suspect in self.master_suspects:
            if re.search(r'\b' + re.escape(suspect) + r'\b', text, re.IGNORECASE):
                potential_names.add(suspect)
            else:
                parts = suspect.replace("Md.", "").replace("Mr.", "").strip().split()
                if len(parts) >= 2:
                    subname = " ".join(parts)
                    if re.search(r'\b' + re.escape(subname) + r'\b', text, re.IGNORECASE):
                        potential_names.add(suspect)

        # Catch names with honorifics or role prefixes (e.g. "Md Hardik Kant", "Md. Ranbir Bhalla", "Mr. Rajesh Shah")
        context_patterns = [
            r'(?:accused(?:\s+persons?)?|suspects?|arrested|identified\s+as|associate\s+of|handler|shooter|complainant)\s+([A-Z][A-Za-z\.\'\-]+(?:\s+[A-Z][A-Za-z\.\'\-]+){1,3})',
            r'\b(?:(?:Md\.?|Mr\.?|Mrs\.?|Ms\.?)\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\b'
        ]

        for c_pat in context_patterns:
            for candidate in re.findall(c_pat, text):
                cand_clean = candidate.strip().replace("Accused ", "").replace("Suspect ", "").replace("Complainant ", "")
                cand_lower = cand_clean.lower()
                # Exclude obvious non-name phrases and locations
                if any(w in cand_lower for w in ["special", "crime", "station", "venus", "wine", "shop", "lower", "parel", "dadar", "byculla", "arms", "act", "case", "pulsar", "innova", "road", "marg", "lane", "street", "market", "bazaar", "cctv", "merchant"]):
                    continue
                match_res = self.fuzzy_match_suspect(cand_clean)
                if match_res:
                    potential_names.add(match_res[0])
                elif len(cand_clean.split()) >= 2 and cand_clean not in locations_found:
                    potential_names.add(cand_clean)


        for name in potential_names:

            match_info = self.fuzzy_match_suspect(name)

            resolved_id = match_info[0] if match_info else name

            conf = match_info[1] if match_info else 0.85

            phone = self.master_phones.get(resolved_id, "Unknown / Burner")



            inferred_role = "Co-Accused / Conspirator"

            for role_name, kws in ROLE_KEYWORDS.items():

                for kw in kws:

                    name_pos = text.lower().find(name.lower())

                    if name_pos != -1:

                        window = text.lower()[max(0, name_pos - 120): min(len(text), name_pos + len(name) + 120)]

                        if kw in window:

                            inferred_role = role_name

                            break


            suspects_resolved.append({

                "name": resolved_id,

                "raw_mention": name,

                "matched_in_database": match_info is not None,

                "confidence": conf,

                "phone_number": phone,

                "inferred_role": inferred_role

            })

            entities.append({"text": resolved_id, "category": "SUSPECT_PERSON", "confidence": conf})


        # 9. Statutes & Modus Operandi

        statutes = self.extract_ipc_and_statutes(text)

        for stat in statutes:

            entities.append({"text": f"{stat['raw_section']} ({stat['title']})", "category": "LEGAL_STATUTE", "confidence": 0.98})


        modus_operandi = self.classify_modus_operandi(text)


        # 10. Generate Directed Relationships

        relationships = []
        suspect_names = [s["name"] for s in suspects_resolved]

        # Existing co-occurrence based relationships (kept as baseline)
        for i in range(len(suspect_names)):
            for j in range(i + 1, len(suspect_names)):
                relationships.append({
                    "source": suspect_names[i],
                    "target": suspect_names[j],
                    "relation_type": "CO_CONSPIRATOR",
                    "evidence": "Mentioned together in FIR narrative",
                    "confidence": 0.92
                })

        for s in suspect_names:
            for loc in locations_found:
                relationships.append({
                    "source": s,
                    "target": loc,
                    "relation_type": "OPERATED_AT",
                    "evidence": f"Incident location noted as {loc}",
                    "confidence": 0.88
                })

        for s in suspect_names:
            for wep in weapons_found:
                relationships.append({
                    "source": s,
                    "target": wep,
                    "relation_type": "POSSESSED_WEAPON",
                    "evidence": f"Recovered/Used weapon: {wep}",
                    "confidence": 0.85
                })

        for s in suspect_names:
            for veh in vehicles_found:
                relationships.append({
                    "source": s,
                    "target": veh,
                    "relation_type": "USED_VEHICLE",
                    "evidence": f"Used vehicle/getaway transport: {veh}",
                    "confidence": 0.88
                })

        # Role-based relationships
        # Define role pair to (relationship_type, confidence, evidence_template)
        role_relationships = {
            ("Mastermind / Kingpin", "Sharpshooter / Shooter"): ("COMMANDED", 0.95, "{source} commanded {target}"),
            ("Mastermind / Kingpin", "Logistics & Recce"): ("DIRECTED_LOGISTICS", 0.93, "{source} directed logistics of {target}"),
            ("Mastermind / Kingpin", "Mule / Courier"): ("DIRECTED_TRANSPORT", 0.93, "{source} directed transport operations of {target}"),
            ("Logistics & Recce", "Sharpshooter / Shooter"): ("PROVIDED_LOGISTICS_TO", 0.90, "{source} provided logistics support to {target}"),
            ("Mule / Courier", "Mastermind / Kingpin"): ("TRANSPORTED_FOR", 0.90, "{source} transported goods/funds for {target}"),
            ("Sharpshooter / Shooter", "Logistics & Recce"): ("RECEIVED_LOGISTICS_FROM", 0.90, "{source} received logistics support from {target}"),
            # Add symmetric relationships for same role? Not needed.
        }

        # Generate role-based relationships
        for i, s1 in enumerate(suspects_resolved):
            for j, s2 in enumerate(suspects_resolved):
                if i >= j:
                    continue  # Avoid duplicate and self
                role1 = s1["inferred_role"]
                role2 = s2["inferred_role"]
                name1 = s1["name"]
                name2 = s2["name"]

                # Check direct role pair
                if (role1, role2) in role_relationships:
                    rel_type, conf, evidence_tpl = role_relationships[(role1, role2)]
                    relationships.append({
                        "source": name1,
                        "target": name2,
                        "relation_type": rel_type,
                        "evidence": evidence_tpl.format(source=name1, target=name2),
                        "confidence": conf
                    })
                # Check reverse role pair
                elif (role2, role1) in role_relationships:
                    rel_type, conf, evidence_tpl = role_relationships[(role2, role1)]
                    relationships.append({
                        "source": name2,
                        "target": name1,
                        "relation_type": rel_type,
                        "evidence": evidence_tpl.format(source=name2, target=name1),
                        "confidence": conf
                    })

        # Financial relationships: link suspects to financial amounts based on contextual clues
        # Patterns: "received Rs. X from", "paid Rs. X to", "got Rs. X from", etc.
        for i, s1 in enumerate(suspect_names):
            for j, s2 in enumerate(suspect_names):
                if i >= j:
                    continue
                # Check for money transfer patterns
                pattern = rf'(?:{re.escape(s1)}|{re.escape(s2)}).+?(?:received|got|paid|gave).+?(?:rs|rupees|inr|₹).+?[\d,]+.+?(?:lakhs?|crores?).+?(?:{re.escape(s1)}|{re.escape(s2)})'
                if re.search(pattern, text, re.IGNORECASE):
                    relationships.append({
                        "source": s1,
                        "target": s2,
                        "relation_type": "FINANCED",
                        "evidence": f"Financial transaction mentioned between {s1} and {s2}",
                        "confidence": 0.85
                    })

        # Communication relationships: link suspects to phone numbers
        for suspect in suspect_names:
            for phone in phones_found:
                # Check for communication association patterns
                pattern = rf'{re.escape(suspect)}.+?(?:called|spoke over phone|texted|messaged|owned|used).+?{re.escape(phone)}|{re.escape(phone)}.+?(?:is|belongs to|assigned to).+?{re.escape(suspect)}'
                if re.search(pattern, text, re.IGNORECASE):
                    relationships.append({
                        "source": suspect,
                        "target": phone,
                        "relation_type": "ASSOCIATED_PHONE",
                        "evidence": f"Suspect {suspect} associated with phone {phone}",
                        "confidence": 0.8
                    })

        # Enhanced location relationships: HID_AT, BASED_AT based on context
        for s in suspect_names:
            for loc in locations_found:
                # Check for hideout/base patterns
                pattern = rf'{re.escape(s)}\s+(?:was hiding at|hid at|based at|operated from|operated out of)\s+{re.escape(loc)}|{re.escape(loc)}\s+(?:is where|is the hideout of|is the base of)\s+{re.escape(s)}'
                if re.search(pattern, text, re.IGNORECASE):
                    # Determine relation type based on verb
                    if re.search(r'\b(?:was hiding at|hid at)\b', text, re.IGNORECASE):
                        rel_type = "HID_AT"
                    else:
                        rel_type = "BASED_AT"  # default for operated from, based at, etc.
                    relationships.append({
                        "source": s,
                        "target": loc,
                        "relation_type": rel_type,
                        "evidence": f"Suspect {s} linked to location {loc} as hideout/base",
                        "confidence": 0.85
                    })
        max_statute_sev = max([s["severity_score"] for s in statutes], default=4)

        weapon_multiplier = 1.3 if weapons_found else 1.0

        multi_suspect_boost = min(1.4, 1.0 + (len(suspect_names) * 0.1))

        severity_score = min(100.0, round(max_statute_sev * 7.5 * weapon_multiplier * multi_suspect_boost, 1))

        # ---------------------------------------------------------------------------
        # Auto-suggest applicable IPC/BNS sections based on crime taxonomy matches
        # that were NOT already explicitly extracted from the FIR text
        # ---------------------------------------------------------------------------
        CRIME_TO_IPC_SUGGESTIONS: Dict[str, List[Dict[str, Any]]] = {
            "Extortion & Protection Racket": [
                {"code": "384", "suggestion_reason": "Extortion keywords detected"},
                {"code": "386", "suggestion_reason": "Threat of death/grievous hurt pattern detected"},
                {"code": "506", "suggestion_reason": "Criminal intimidation pattern detected"},
                {"code": "120B", "suggestion_reason": "Organized extortion implies criminal conspiracy"},
            ],
            "Armed Robbery / Dacoity": [
                {"code": "392", "suggestion_reason": "Robbery keywords detected"},
                {"code": "395", "suggestion_reason": "Gang/dacoity pattern detected"},
                {"code": "397", "suggestion_reason": "Armed robbery with injury pattern detected"},
                {"code": "25",  "suggestion_reason": "Firearm use implies Arms Act violation"},
            ],
            "Contract Killing / Hit": [
                {"code": "302", "suggestion_reason": "Murder / contract killing keywords detected"},
                {"code": "307", "suggestion_reason": "Attempt to murder pattern detected"},
                {"code": "120B", "suggestion_reason": "Hired hit implies criminal conspiracy"},
                {"code": "34",  "suggestion_reason": "Common intention of multiple accused"},
            ],
            "Narcotics Trafficking": [
                {"code": "8(C)", "suggestion_reason": "NDPS possession/trade keywords detected"},
                {"code": "21",  "suggestion_reason": "Hard narcotic substance keywords detected"},
                {"code": "29",  "suggestion_reason": "Conspiracy/abetment in drug network"},
                {"code": "120B","suggestion_reason": "Organized narcotics syndicate pattern"},
            ],
            "Hawala & Money Laundering": [
                {"code": "420", "suggestion_reason": "Cheating / fraudulent transfer detected"},
                {"code": "467", "suggestion_reason": "Hawala implies forged financial instruments"},
                {"code": "468", "suggestion_reason": "Forgery for cheating pattern detected"},
                {"code": "120B","suggestion_reason": "Money laundering network implies conspiracy"},
            ],
            "Illegal Arms Smuggling": [
                {"code": "25",  "suggestion_reason": "Illegal arms possession/manufacture"},
                {"code": "27",  "suggestion_reason": "Use of arms in commission of offence"},
                {"code": "120B","suggestion_reason": "Organized smuggling ring implies conspiracy"},
            ],
            "Cyber Syndicate / Identity Theft": [
                {"code": "420", "suggestion_reason": "Cheating via fraudulent digital means"},
                {"code": "467", "suggestion_reason": "Forged identity documents (Aadhaar/PAN)"},
                {"code": "120B","suggestion_reason": "Organized cyber syndicate implies conspiracy"},
            ],
        }

        already_extracted_codes = {s["code"] for s in statutes}
        detected_mo_categories = {mo["crime_category"] for mo in modus_operandi if mo["confidence"] >= 0.5}
        suggested_statutes: List[Dict[str, Any]] = []
        seen_suggestions: Set[str] = set()

        for crime_cat in detected_mo_categories:
            for suggestion in CRIME_TO_IPC_SUGGESTIONS.get(crime_cat, []):
                code = suggestion["code"]
                if code not in already_extracted_codes and code not in seen_suggestions:
                    seen_suggestions.add(code)
                    statute_info = LEGAL_STATUTES.get(code, {})
                    if statute_info:
                        suggested_statutes.append({
                            "code": code,
                            "raw_section": f"Suggested: IPC/BNS Sec {code}",
                            "title": statute_info["title"],
                            "bns_equivalent": statute_info["bns_equiv"],
                            "severity_score": statute_info["severity"],
                            "category": statute_info["category"],
                            "bailable": statute_info["bailable"],
                            "confidence": 0.75,
                            "suggested": True,
                            "suggestion_reason": suggestion["suggestion_reason"],
                        })

        tier_label = (
            "CRITICAL" if severity_score >= 80 else
            "HIGH"     if severity_score >= 60 else
            "MODERATE" if severity_score >= 35 else
            "LOW"
        )

        return {

            "entities": self._apply_confidence_calibration(entities),

            "suspects": suspects_resolved,

            "locations": list(set(locations_found)),

            "weapons": weapons_found,

            "vehicles": vehicles_found,

            "aliases": aliases_found,

            "statutes": statutes,

            "suggested_statutes": suggested_statutes,

            "modus_operandi": modus_operandi,

            "financial_amounts": financial_amounts,

            "dates": list(set(dates_found)),

            "relationships": relationships,

            "case_severity_score": severity_score,

            "severity_tier": tier_label,

            "summary_verdict": (
                f"[{tier_label}] {len(suspects_resolved)} suspect(s) identified across {len(list(set(locations_found)))} location(s). "
                f"{len(statutes)} statutory violation(s) extracted; {len(suggested_statutes)} additional charge(s) recommended. "
                f"{len(weapons_found)} weapon(s) and {len(vehicles_found)} vehicle(s) logged."
            )

        }
