import { STAFF_ROLES } from "@/lib/forms";

// The ten healthcare professional roles as a flowing chip cloud.
export function RoleCloud({ small = false, className = "" }: { small?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {STAFF_ROLES.map((role) => (
        <li key={role.code} className={`k-chip${small ? " k-chip-sm" : ""}`}>
          {role.label}
        </li>
      ))}
    </ul>
  );
}
