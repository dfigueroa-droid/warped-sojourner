import os
import json
import logging
from datetime import datetime

# Production Import
try:
    from web3 import Web3
    from web3.middleware import geth_poa_middleware
except ImportError:
    logging.warning("Web3 library not found. Install via 'pip install web3'. Running in structure-only mode.")
    Web3 = None

class RealBlockchainConnector:
    """
    PRODUCTION CONNECTOR.
    Connects to Mainnet via Infura/Alchemy RPC.
    Requires ENV VARS: NEO_IURIS_INFURA_URL, NEO_IURIS_WALLET_PRIVATE_KEY.
    """
    
    def __init__(self):
        self.infura_url = os.getenv("NEO_IURIS_INFURA_URL", "https://mainnet.infura.io/v3/YOUR_KEY")
        self.private_key = os.getenv("NEO_IURIS_WALLET_PRIVATE_KEY", None)
        
        self.w3 = None
        if Web3:
            self.w3 = Web3(Web3.HTTPProvider(self.infura_url))
            if self.w3.is_connected():
                logging.info(f"Connected to Ethereum Mainnet via {self.infura_url}")
            else:
                logging.error("Failed to connect to Blockchain Node.")

    def anchor_evidence(self, file_hash: str, case_id: str):
        """
        Sends a REAL Transaction to the Blockchain.
        Warning: Costs Gas (ETH/MATIC).
        """
        if not self.w3 or not self.w3.is_connected():
            raise ConnectionError("Blockchain Connection Unavailable. Check Infura URL.")
        
        if not self.private_key:
            raise ValueError("No Private Key Configured for Singing Transactions.")

        # 1. Prepare Account
        account = self.w3.eth.account.from_key(self.private_key)
        nonce = self.w3.eth.get_transaction_count(account.address)

        # 2. Build Transaction Payload (Input Data = Hash)
        # We store the hash in the 'data' field (Hex representation)
        payload_data = f"NEO-IURIS:{case_id}:{file_hash}"
        data_hex = self.w3.to_hex(text=payload_data)

        tx = {
            'nonce': nonce,
            'to': account.address, # Sending to self to burn gas and store data
            'value': 0,
            'gas': 50000,
            'gasPrice': self.w3.eth.gas_price,
            'data': data_hex,
            'chainId': 1 # Mainnet
        }

        # 3. Sign Transaction
        signed_tx = self.w3.eth.account.sign_transaction(tx, self.private_key)

        # 4. Broadcast
        try:
            tx_hash_bytes = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            tx_hash = self.w3.to_hex(tx_hash_bytes)
            
            # 5. Wait for Receipt (Blocking in production logic, maybe async in high throughput)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                "status": "ANCHORED_ON_CHAIN",
                "network": "Ethereum Mainnet",
                "tx_hash": tx_hash,
                "block_number": receipt.blockNumber,
                "gas_used": receipt.gasUsed,
                "timestamp": datetime.now().isoformat(),
                "explorer_link": f"https://etherscan.io/tx/{tx_hash}"
            }
            
        except Exception as e:
            logging.error(f"Blockchain Transaction Failed: {e}")
            return {"status": "ERROR", "detail": str(e)}

if __name__ == "__main__":
    # Integration Test (Will fail without Keys, but validates structure)
    bc = RealBlockchainConnector()
    print("Blockchain Connector Initialized. Web3 Detected:", bool(Web3))
