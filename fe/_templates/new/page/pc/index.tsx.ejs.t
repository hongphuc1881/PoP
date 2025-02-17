---
to: <%= output_path %>/pc/index.tsx
---

import styles from "./styles.module.css";

export const <%= pc_component_name %> = () => {
  return <div className={styles.module}>
   <%= pc_component_name %> 
  </div>
}
 