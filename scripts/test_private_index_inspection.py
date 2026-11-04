"""Offline checks for private crawl-report row handling."""

import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).parent))

import private_index_inspection as inspection


class SaveRowsTests(unittest.TestCase):
    def test_same_day_url_is_updated_instead_of_duplicated(self):
        calls = []

        def fake_request(_session, method, url, label, **kwargs):
            calls.append((method, url, label, kwargs))
            if label == "Read inspection dates":
                return {"values": [
                    inspection.HEADER,
                    ["2026-11-04", "https://repaywise.co.uk/"],
                ]}
            return {}

        rows = [
            ["2026-11-04", "https://repaywise.co.uk/", *([""] * 8)],
            ["2026-11-04", "https://repaywise.co.uk/guides", *([""] * 8)],
        ]
        with patch.object(inspection, "request_json", side_effect=fake_request):
            inspection.save_rows(None, "sheet-id", "SEO Crawl", rows)

        writes = [(method, label) for method, _url, label, _kw in calls if method != "GET"]
        self.assertEqual(writes, [
            ("PUT", "Update private inspection row"),
            ("POST", "Append private inspection row"),
        ])
        self.assertEqual(calls[1][3]["json_body"]["values"], [rows[0]])
        self.assertEqual(calls[2][3]["json_body"]["values"], [rows[1]])


if __name__ == "__main__":
    unittest.main()
