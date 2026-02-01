import datetime

class LitigationCalculator:
    """
    Laboratorio Procesal (Litigation Lab).
    
    Function: Calculate procedural deadlines (terms) excluding weekends and holidays.
    Jurisdiction: Mexico Federal Courts (Default).
    """

    def __init__(self):
        self.holidays_mx = [
            "2025-01-01", "2025-02-05", "2025-03-17", "2025-05-01", 
            "2025-09-16", "2025-11-17", "2025-12-25"
        ]

    def _is_business_day(self, date_obj):
        """Check if date is a business day (Mon-Fri and not holiday)."""
        if date_obj.weekday() >= 5: # 5=Sat, 6=Sun
            return False
        date_str = date_obj.strftime("%Y-%m-%d")
        if date_str in self.holidays_mx:
            return False
        return True

    def calculate_deadline(self, start_date_str, days, type="BUSINESS_DAYS"):
        """
        Calculates the deadline date.
        """
        current_date = datetime.datetime.strptime(start_date_str, "%Y-%m-%d")
        added_days = 0
        
        while added_days < days:
            current_date += datetime.timedelta(days=1)
            if type == "BUSINESS_DAYS":
                if self._is_business_day(current_date):
                    added_days += 1
            else:
                added_days += 1
                
        return {
            "start_date": start_date_str,
            "term_days": days,
            "calculus_type": type,
            "deadline": current_date.strftime("%Y-%m-%d"),
            "fatal_day": (current_date + datetime.timedelta(days=1)).strftime("%Y-%m-%d") # Day after term
        }

if __name__ == "__main__":
    calc = LitigationCalculator()
    # Example: 15 days for an "Amparo" starting Jan 1st 2025
    print(calc.calculate_deadline("2025-01-01", 15))
