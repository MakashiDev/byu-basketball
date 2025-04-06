/**
 * Utility functions for player management
 */

/**
 * Increments a player's year classification to the next level
 * @param currentYear The player's current year classification
 * @returns The next year classification or null if the player should graduate
 */
export function incrementPlayerYear(currentYear: string): string | null {
  const yearProgressions: Record<string, string | null> = {
    "Freshman": "Sophomore",
    "Sophomore": "Junior",
    "Junior": "Senior",
    "Senior": null, // Indicates graduation
    "RS-Junior": "RS-Senior",
    "RS-Senior": null, // Indicates graduation
    "Graduate": null, // Indicates graduation
  };

  return yearProgressions[currentYear] || currentYear;
}

/**
 * Determines if a player should be marked as graduated based on their year
 * @param currentYear The player's current year classification
 * @returns Boolean indicating if the player should be marked as graduated
 */
export function shouldGraduate(currentYear: string): boolean {
  return [
    "Senior",
    "RS-Senior",
    "Graduate"
  ].includes(currentYear);
}