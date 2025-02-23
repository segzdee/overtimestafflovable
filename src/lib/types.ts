
export type BaseRole = 'shift-worker' | 'agency' | 'company' | 'aiagent' | 'admin';

export interface RoleAlias {
  id: string;
  base_role: BaseRole;
  alias: string;
  is_canonical: boolean;
  created_at: string;
  updated_at: string;
}
