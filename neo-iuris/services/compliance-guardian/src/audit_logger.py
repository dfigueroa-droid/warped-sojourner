import hashlib
import json
import time
import os

class ImmutableAuditLogger:
    """
    Fortified Audit Logger.
    Uses hash chaining to simulate an immutable ledger.
    """
    def __init__(self, log_file="audit_chain.json"):
        self.log_file = log_file
        self._ensure_log_exists()

    def _ensure_log_exists(self):
        if not os.path.exists(self.log_file):
            with open(self.log_file, "w") as f:
                # Genesis block
                json.dump([{"hash": "0", "timestamp": time.time(), "event": "GENESIS"}], f)

    def _get_last_entry(self):
        with open(self.log_file, "r") as f:
            chain = json.load(f)
            return chain[-1]

    def log_event(self, event_type, details, user_id="system"):
        """
        Logs an event with cryptographic linkage to the previous entry.
        """
        last_entry = self._get_last_entry()
        prev_hash = hashlib.sha256(json.dumps(last_entry, sort_keys=True).encode()).hexdigest()

        new_entry = {
            "prev_hash": prev_hash,
            "timestamp": time.time(),
            "event_type": event_type,
            "user_id": user_id,
            "details": details
        }

        # Thread-unsafe implementation for prototype; would use DB in production
        with open(self.log_file, "r+") as f:
            chain = json.load(f)
            chain.append(new_entry)
            f.seek(0)
            json.dump(chain, f, indent=2)
        
        print(f"[AUDIT] Event logged: {prev_hash[:8]}... -> {event_type}")

if __name__ == "__main__":
    logger = ImmutableAuditLogger()
    logger.log_event("ACCESS_GRANTED", {"resource": "SCJN_API"})
