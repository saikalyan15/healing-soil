/**
 * Per-city climate and water profile.
 *
 * Two things drive which soap suits a place, and neither is a therapeutic claim:
 *
 *   Humidity decides how a bar feels. In sticky coastal air a rich, heavily
 *   fatted bar can feel heavy and slow to rinse; a lighter glycerin base feels
 *   cleaner. In dry inland winters the reverse is true.
 *
 *   Water hardness decides how a bar lathers. Hard water is high in calcium and
 *   magnesium, which react with soap to form scum instead of lather, so a bar
 *   can feel like it is not working and leave a film. This is chemistry, not
 *   dermatology, and it varies enormously across Indian cities: Delhi and much
 *   of Gujarat and Rajasthan run very hard, while Mumbai and Kolkata, drawing on
 *   surface water, are comparatively soft.
 *
 * Values describe the general character of municipal supply and the dominant
 * seasonal pattern. They are not measurements, and supply varies by
 * neighbourhood and by season, so copy built on this should stay descriptive
 * ("tends to be hard") rather than absolute.
 *
 * CDSCO note: everything here is about how a bar lathers, rinses and feels.
 * Nothing in this file may be used to link climate, water or pollution to a
 * skin condition or to a remedy. See CLAUDE.md.
 */

export type Humidity = 'high' | 'moderate' | 'low'
export type WaterHardness = 'soft' | 'moderate' | 'hard' | 'very-hard'

/** The base we lead with for a given profile. Drives product selection. */
export type PreferredBase = 'glycerin' | 'goat-milk' | 'shea-butter'

export type ClimateProfile = {
  citySlug: string
  humidity: Humidity
  waterHardness: WaterHardness
  /** Short factual phrase describing the year, used in copy. */
  seasonNote: string
}

export const climateProfiles: ClimateProfile[] = [
  // ── Coastal and high humidity ────────────────────────────────────────────
  { citySlug: 'mumbai', humidity: 'high', waterHardness: 'soft', seasonNote: 'humid for most of the year, with a long and heavy monsoon' },
  { citySlug: 'thane', humidity: 'high', waterHardness: 'soft', seasonNote: 'humid for most of the year, with a long and heavy monsoon' },
  { citySlug: 'goa', humidity: 'high', waterHardness: 'soft', seasonNote: 'humid nearly year round, with a heavy monsoon from June' },
  { citySlug: 'chennai', humidity: 'high', waterHardness: 'hard', seasonNote: 'hot and humid for most of the year, with rain arriving late in the north-east monsoon' },
  { citySlug: 'kochi', humidity: 'high', waterHardness: 'soft', seasonNote: 'humid year round, with two monsoons and very little dry season' },
  { citySlug: 'visakhapatnam', humidity: 'high', waterHardness: 'moderate', seasonNote: 'coastal and humid, with rain across both monsoons' },
  { citySlug: 'bhubaneswar', humidity: 'high', waterHardness: 'soft', seasonNote: 'hot and humid, with a heavy south-west monsoon' },
  { citySlug: 'kolkata', humidity: 'high', waterHardness: 'soft', seasonNote: 'humid for much of the year, with a long monsoon and a short mild winter' },
  { citySlug: 'guwahati', humidity: 'high', waterHardness: 'soft', seasonNote: 'very wet, with one of the longest monsoons in the country' },
  { citySlug: 'surat', humidity: 'high', waterHardness: 'hard', seasonNote: 'humid and coastal, with a concentrated monsoon' },

  // ── Deccan and inland plateau, moderate ──────────────────────────────────
  { citySlug: 'bangalore', humidity: 'moderate', waterHardness: 'hard', seasonNote: 'mild through the year, so soap choice is driven more by water than by season' },
  { citySlug: 'mysore', humidity: 'moderate', waterHardness: 'moderate', seasonNote: 'mild and even through the year' },
  { citySlug: 'pune', humidity: 'moderate', waterHardness: 'moderate', seasonNote: 'dry for much of the year with a defined monsoon and a cool winter' },
  { citySlug: 'nashik', humidity: 'moderate', waterHardness: 'moderate', seasonNote: 'dry and pleasant for much of the year, cooler in winter' },
  { citySlug: 'hyderabad', humidity: 'moderate', waterHardness: 'hard', seasonNote: 'hot and dry through summer, with a shorter monsoon than the coast' },
  { citySlug: 'nagpur', humidity: 'moderate', waterHardness: 'moderate', seasonNote: 'very hot and dry in summer, with a defined monsoon' },
  { citySlug: 'coimbatore', humidity: 'moderate', waterHardness: 'hard', seasonNote: 'warm and comparatively dry, sheltered from the heaviest monsoon' },
  { citySlug: 'indore', humidity: 'moderate', waterHardness: 'hard', seasonNote: 'hot and dry in summer, with a cool dry winter' },
  { citySlug: 'bhopal', humidity: 'moderate', waterHardness: 'hard', seasonNote: 'hot and dry in summer, with a cool dry winter' },

  // ── Northern plains, dry and hard water ──────────────────────────────────
  { citySlug: 'delhi', humidity: 'low', waterHardness: 'very-hard', seasonNote: 'extreme in both directions, very hot and dry in summer and cold and dry in winter' },
  { citySlug: 'jaipur', humidity: 'low', waterHardness: 'very-hard', seasonNote: 'arid, with very hot summers and dry winters' },
  { citySlug: 'lucknow', humidity: 'low', waterHardness: 'hard', seasonNote: 'hot and dry in summer, with a cold dry winter' },
  { citySlug: 'chandigarh', humidity: 'low', waterHardness: 'moderate', seasonNote: 'hot summers and genuinely cold, dry winters' },
  { citySlug: 'dehradun', humidity: 'moderate', waterHardness: 'soft', seasonNote: 'cooler than the plains, with heavy monsoon rain and a cold winter' },
  { citySlug: 'ahmedabad', humidity: 'low', waterHardness: 'very-hard', seasonNote: 'hot and dry for most of the year, with a short monsoon' },
  { citySlug: 'vadodara', humidity: 'low', waterHardness: 'hard', seasonNote: 'hot and dry for most of the year, with a short monsoon' },
  { citySlug: 'rajkot', humidity: 'low', waterHardness: 'very-hard', seasonNote: 'arid and hot, with a brief monsoon' },
]

const byCity = new Map(climateProfiles.map((c) => [c.citySlug, c]))

export function climateFor(citySlug: string): ClimateProfile | undefined {
  return byCity.get(citySlug)
}

/**
 * Which base to lead with, in order of preference.
 *
 * Hard water is the stronger signal, because it changes whether a bar lathers
 * at all. A glycerin base rinses cleaner and leaves less film where the water is
 * heavy in minerals. Humidity comes second: sticky air favours a lighter bar,
 * dry air a richer one.
 */
export function preferredBases(profile: ClimateProfile): PreferredBase[] {
  const hardWater = profile.waterHardness === 'hard' || profile.waterHardness === 'very-hard'

  // Both signals are used, not just the stronger one. Ranking on hard water
  // alone put glycerin first for roughly twenty of the twenty-seven cities,
  // which made the recommendations effectively identical and defeated the
  // point of having the data.
  if (hardWater) {
    // Glycerin leads either way, but dry air changes what should sit second.
    return profile.humidity === 'low'
      ? ['glycerin', 'shea-butter', 'goat-milk']
      : ['glycerin', 'goat-milk', 'shea-butter']
  }

  if (profile.humidity === 'high') return ['glycerin', 'goat-milk', 'shea-butter']
  if (profile.humidity === 'low') return ['shea-butter', 'goat-milk', 'glycerin']
  return ['goat-milk', 'shea-butter', 'glycerin']
}

/**
 * One sentence on what the water does to a bar. Feel and lather only.
 */
export function waterNote(profile: ClimateProfile): string {
  switch (profile.waterHardness) {
    case 'very-hard':
      return 'Water here is typically very hard, so soap lathers less and can leave a film. A glycerin base rinses cleaner than a heavily fatted bar.'
    case 'hard':
      return 'Water here tends to be hard, which cuts back lather and can leave a slight film. A lighter glycerin base rinses away more completely.'
    case 'moderate':
      return 'Water here is moderately hard, so most bars lather reasonably well.'
    case 'soft':
      return 'Water here is comparatively soft, so soap lathers easily and rinses clean, and a richer bar is comfortable to use.'
  }
}

/**
 * One sentence on what the climate does to how a bar feels.
 */
export function humidityNote(profile: ClimateProfile): string {
  switch (profile.humidity) {
    case 'high':
      return 'In humid air a rich, heavily fatted bar can feel heavy on the skin, so a lighter one usually feels better day to day.'
    case 'low':
      return 'In dry air a richer, more conditioning bar tends to feel more comfortable, and skin feels less tight after washing.'
    case 'moderate':
      return 'The climate is even enough that either a light or a rich bar works, so water is the more useful guide.'
  }
}
