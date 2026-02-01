class LabelingAuditor:
    """
    Laboratorio de Etiquetado (Sanitary Lab).
    
    Function: Audit packaging compliance with NOM-051-SCFI/SSA1-2010.
    Focus: Warning octagons and cautionary legends.
    """

    def audit_product(self, product_data):
        """
        Audits a product's nutritional data to determine required stamps.
        """
        stamps = []
        nutrients = product_data.get("nutrients_per_100g", {})
        
        # NOM-051 simplified logic (thresholds)
        if nutrients.get("added_sugars_kcal", 0) >= 10: # >10% of total energy
            stamps.append("EXCESO AZÚCARES")
            
        if nutrients.get("sodium_mg", 0) >= 300: # >300mg (simplified)
            stamps.append("EXCESO SODIO")
            
        if nutrients.get("saturated_fat_kcal", 0) >= 10:
            stamps.append("EXCESO GRASAS SATURADAS")

        legends = []
        if product_data.get("contains_caffeine"):
            legends.append("CONTIENE CAFEÍNA EVITAR EN NIÑOS")
        if product_data.get("contains_sweeteners"):
            legends.append("CONTIENE EDULCORANTES, NO RECOMENDABLE EN NIÑOS")

        return {
            "product": product_data.get("name"),
            "required_octagons": stamps,
            "required_legends": legends,
            "compliant": False if (not stamps and not legends) else "REQUIRES_CHANGES"
        }

if __name__ == "__main__":
    auditor = LabelingAuditor()
    soda = {
        "name": "Super Kola",
        "nutrients_per_100g": {"added_sugars_kcal": 40, "sodium_mg": 100},
        "contains_caffeine": True,
        "contains_sweeteners": True
    }
    print(auditor.audit_product(soda))
