---
to: <%= output_path %>/sp/index.tsx
---

import styles from "./styles.module.css";

export const <%= sp_component_name %> = () => {
  return <div className={styles.module}>
    sp_component_name
  </div>
}