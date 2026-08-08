import complianceRules from '../../config/compliance-rules.json'

type ComplianceRule = {
  label: string
  pattern: string
  flags: string
}

const compiledRules = (complianceRules as ComplianceRule[]).map((rule) => ({
  label: rule.label,
  pattern: new RegExp(rule.pattern, rule.flags),
}))

/** Return the policy categories matched by customer- or API-managed copy. */
export function prohibitedClaimCategories(value: string): string[] {
  return compiledRules
    .filter(({ pattern }) => pattern.test(value))
    .map(({ label }) => label)
}
